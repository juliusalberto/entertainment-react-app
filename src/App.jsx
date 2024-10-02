import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/SearchBar/SearchBar'
import MoviesPage from './pages/MoviesPage';
import TVSeriesPage from './pages/TVSeriesPage';
import BookmarkPage from './pages/BookmarkPage';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {AuthProvider, useAuth} from "./context/AuthContext"
import { fetchTrending, fetchByCategory, searchMulti } from './services/tmdbapi'
import { addBookmark, removeBookmark, getBookmarks } from './firebase/firebase'
import ProfilePage from './pages/ProfilePage';


function AppContent() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentCategory, setCurrentCategory] = useState('all')
  const [bookmarked, setBookmarked] = useState(new Set())
  const { currentUser, loading } = useAuth();
  const location = useLocation()

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (currentUser) {
        const userBookmarks = await getBookmarks(currentUser.uid);
        const bookmarkSet = new Set(userBookmarks.map(bookmark => JSON.stringify(bookmark)));
        setBookmarked(bookmarkSet);
        console.log("Fetched bookmarks:", bookmarkSet);
      } else {
        setBookmarked(new Set());
        console.log("No user, cleared bookmarks");
      }
    };
  
    fetchBookmarks();
  }, [currentUser]);

  useEffect(() => {
    const fetchMedia = async () => {
      let trendingAll = await fetchTrending();
      trendingAll = trendingAll.map(trendingMovie => ({ isTrending: true, ...trendingMovie }));
      
      const popularMovies = await fetchByCategory('movie', 'popular');
      const popularTVSeries = await fetchByCategory('tv', 'popular');
      const allMedia = [...trendingAll, ...popularMovies, ...popularTVSeries];
      const processedMedia = allMedia.map(item => preprocessMediaData(item));
      setMovies(processedMedia);
    }
  
    const searchMedia = async () => {
      const searchResults = await searchMulti(searchTerm);
      const processedResults = searchResults.map(item => preprocessMediaData(item));
      setMovies(processedResults);
    }
  
    let timeoutId;
  
    if (searchTerm === '') {
      fetchMedia();
      console.log(bookmarked)
    } else {
      timeoutId = setTimeout(searchMedia, 300);
    }
  
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [searchTerm, bookmarked, currentUser]) 

  function preprocessMediaData(item) {
    const releaseDate = item.release_date || item.first_air_date;
    const year = releaseDate ? releaseDate.substring(0, 4) : 'N/A';
    const media_type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
    
    const bookmarkKey = JSON.stringify({ type: media_type, id: item.id.toString() });
    const isBookmarked = bookmarked.has(bookmarkKey);
    
    const result = {
      ...item,
      imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      isBookmarked: isBookmarked,
      media_type: media_type,
      category: item.media_type === 'tv' ? 'TV Series' : 'Movie',
      title: item.title || item.name, // TV shows use 'name' instead of 'title'
      rating: item.vote_average,
      year: year
    };
  
    return result;
  };

  const filterMedia = (media, category, term) => {
    return media.filter(item => 
      (category === 'all' || item.category === category) &&
      item.title.toLowerCase().includes(term.toLowerCase())
    )
  }

  const handleBookmarkClick = async (item) => {
    if (!currentUser) {
        console.log("Please log in to bookmark");
        return;
    }
    
    const mediaId = item.id.toString();
    const mediaType = item.media_type;
    
    try {
        const bookmarkKey = JSON.stringify({ type: mediaType, id: mediaId });
        console.log("Bookmark key:", bookmarkKey);
        console.log("Current bookmarks:", [...bookmarked]);
        console.log("Is bookmark in set?", bookmarked.has(bookmarkKey));
        
        if (!bookmarked.has(bookmarkKey)) {
            await addBookmark(currentUser.uid, mediaType, mediaId);
            setBookmarked(prev => new Set([...prev, bookmarkKey]));
            console.log(`Bookmark added for ${mediaType} ${item.title} with id ${mediaId}`);
        } else {
            await removeBookmark(currentUser.uid, mediaType, mediaId);
            setBookmarked(prev => {
                const newSet = new Set(prev);
                newSet.delete(bookmarkKey);
                return newSet;
            });
            console.log(`Bookmark removed for ${mediaType} ${item.title} with id ${mediaId}`);
        }

        setMovies(prev => prev.map(prevItem => 
            prevItem.id.toString() === mediaId
                ? { ...prevItem, isBookmarked: !prevItem.isBookmarked } 
                : prevItem
        ));

        console.log(`Updated movies. Current bookmarks: ${[...bookmarked]}`);

    } catch (error) {
        console.error("Error updating bookmark:", error);
    }
};

  return (
    <div className="bg-very-dark-blue max-h-screen flex lg:flex-row flex-col gap-4 max-w-full overflow-x-hidden">
      <div className="lg:min-w-28 lg:sticky top-0 lg:h-screen lg:p-4 lg:flex lg:flex-col lg:justify-center">{!["/login", "/signup"].includes(location.pathname)  && <Navbar currentCategory={currentCategory}/>}</div>
      <div className="lg:flex lg:flex-col bg-very-dark-blue max-w-full lg:w-full">
      <div className="py-4">{!["/login", "/signup", "/profile"].includes(location.pathname) && <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />}</div>
        <Routes>
          <Route path="/" element={
              <HomePage movies={filterMedia(movies, 'all', searchTerm)} searchTerm={searchTerm} onBookmarkClick={handleBookmarkClick}/>
          } />
          <Route path="/movies" element={
            <MoviesPage
              movies={filterMedia(movies, 'Movie', searchTerm)}
              searchTerm={searchTerm}
              setCurrentCategory={setCurrentCategory}
              onBookmarkClick={handleBookmarkClick}
            />
          } />
          <Route path="/tvseries" element={
            <TVSeriesPage
              series={filterMedia(movies, 'TV Series', searchTerm)}
              searchTerm={searchTerm}
              setCurrentCategory={setCurrentCategory}
              onBookmarkClick={handleBookmarkClick}
            />
          } />
          <Route path="/bookmark" element={
            <BookmarkPage
              bookmarks={bookmarked}
              setCurrentCategory={setCurrentCategory}
              onBookmarkClick={handleBookmarkClick}
            />
          } />
          <Route path="/login" element={
            <LoginPage />
          }/>
          <Route path="/signup" element={
            <SignupPage />
          }/>
          <Route path="/profile" element={
            <ProfilePage />
          }/>
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App