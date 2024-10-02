import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

export default function RecommendedMovies({ movies, headerText, onBookmarkClick }) {
    return (
        <div className="text-Outfit text-white px-4 max-w-full">
            <h2 className="text-heading-s mb-4">{headerText}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 pb-4">
                {movies.map((movie, index) => (
                        <MovieCard
                            key={index}
                            {...movie}
                            isSearch={true}
                            onBookmarkClick={onBookmarkClick}
                        />
                ))}
            </div>
        </div>
    );
}