import { useEffect } from 'react'
import RecommendedMovies from '../components/RecommendedMovies/RecommendedMovies'
import SearchPage from '../pages/SearchPage'

export default function TVSeriesPage({ series, searchTerm, setCurrentCategory, onBookmarkClick }) {
    useEffect(() => {
      setCurrentCategory('TV Series')
      return () => setCurrentCategory('all')
    }, [setCurrentCategory])
  
    return searchTerm ? 
      <SearchPage movies={series} searchTerm={searchTerm} onBookmarkClick={onBookmarkClick}/> :
      <RecommendedMovies movies={series} headerText="TV Series" onBookmarkClick={onBookmarkClick}/>
}