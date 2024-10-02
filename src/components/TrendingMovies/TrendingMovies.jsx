import MovieCard from '../MovieCard/MovieCard';

export default function TrendingMovies(props) {
    const {movies, onBookmarkClick} = props;

    const containerStyle = {
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #161D2F',
        '@media (max-width: 768px)': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      };

    return (
        <div className="text-Outfit text-white px-4">
            <h2 className="text-heading-s mb-4 max-w-fit">Trending</h2>
            <div className="flex overflow-x-auto pb-4 gap-4" style={containerStyle}>
                    {movies.map((movie, index) => {
                        return <div className="lg:shrink-0">
                            <MovieCard key={index} {...movie} onBookmarkClick={onBookmarkClick}/>
                        </div>
                    })}
            </div>
        </div>
    );
}