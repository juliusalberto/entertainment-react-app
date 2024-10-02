import { useEffect } from 'react'
import RecommendedMovies from '../components/RecommendedMovies/RecommendedMovies'
import SearchPage from './SearchPage'

export default function MoviesPage({ movies, searchTerm, setCurrentCategory, onBookmarkClick }) {
  useEffect(() => {
    setCurrentCategory('Movie')
    return () => setCurrentCategory('all')
  }, [setCurrentCategory])

  return searchTerm ? 
    <SearchPage movies={movies} searchTerm={searchTerm} onBookmarkClick={onBookmarkClick}/> :
    <RecommendedMovies movies={movies} headerText="Movies" onBookmarkClick={onBookmarkClick}/>
}