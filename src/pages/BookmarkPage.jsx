import { useEffect, useState } from "react";
import RecommendedMovies from "../components/RecommendedMovies/RecommendedMovies";
import { fetchDetails } from "../services/tmdbapi";

export default function BookmarkPage({ bookmarks, searchTerm, setCurrentCategory, onBookmarkClick }) {
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

    useEffect(() => {
      setCurrentCategory('bookmarked')
      console.log(bookmarks)
      return () => setCurrentCategory('all')
    }, [setCurrentCategory])

    useEffect(() => {
        const fetchBookmarkedMovies = async() => {
            const moviePromises = Array.from(bookmarks).map(media => {
                const parsed = JSON.parse(media)
                console.log(parsed)
                return fetchDetails(parsed.type, parsed.id)});
            const movies = await Promise.all(moviePromises);

            setBookmarkedMovies(movies.map(movie => ({
                ...movie,
                isBookmarked: true,
                imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                media_type: movie.media_type || (movie.first_air_date ? 'tv' : 'movie'),
                category: movie.media_type === 'tv' ? 'TV Series' : 'Movie',
                title: movie.title || movie.name,
                year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'
            })));
        }

        fetchBookmarkedMovies();
    }, [bookmarks])
    

    return (
        <div>
            <h2>Bookmarked Movies</h2>
            <RecommendedMovies movies={bookmarkedMovies} headerText="Bookmarked" onBookmarkClick={onBookmarkClick} />
        </div>
    );
}