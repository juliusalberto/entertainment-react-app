import SearchPage from "./SearchPage";
import TrendingMovies from "../components/TrendingMovies/TrendingMovies";
import RecommendedMovies from "../components/RecommendedMovies/RecommendedMovies";
import { useEffect } from "react";

export default function HomePage(props) {
    const {movies, searchTerm, onBookmarkClick} = props;

    const trendingMedia = movies.filter(item => item.isTrending)
    const recommendedMedia = movies.filter(item => !item.isTrending)


    return (
        searchTerm ? 
            <SearchPage movies={movies} searchTerm={searchTerm} onBookmarkClick={onBookmarkClick}/> :
                <>
                <TrendingMovies movies={trendingMedia} onBookmarkClick={onBookmarkClick}/>
                <RecommendedMovies movies={recommendedMedia} headerText="Recommended" onBookmarkClick={onBookmarkClick} />
                </>
            )
}