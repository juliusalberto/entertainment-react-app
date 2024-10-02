import MovieCard from '../components/MovieCard/MovieCard';
import { useState } from 'react';


export default function SearchPage(props) {
    const {movies, searchTerm, onBookmarkClick} = props;

    return (
        <div className="text-Outfit text-white px-4">
            <h2 className="text-heading-s mb-4">Found {movies.length} {movies.length <= 1 ? 'result' : 'results'} for {searchTerm}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {movies.map((movie, index) => {
                    return <MovieCard key={index} {...movie} isSearch={true} onBookmarkClick={onBookmarkClick}/>
                })}
            </div>
        </div>
    );
}