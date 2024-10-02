import movieIcon from "../../assets/icon-category-movie.svg";
import tvIcon from "../../assets/icon-category-tv.svg";
import bookmarkFullIcon from "../../assets/icon-bookmark-full.svg" 
import bookmarkEmptyIcon from "../../assets/icon-bookmark-empty.svg" 


export default function MovieCard(props) {
    const {id, media_type, title, year, category, rating, imageUrl, isBookmarked, isTrending, isSearch = false, onBookmarkClick } = props;
    const thisMovie = {id, title, year, category, rating, imageUrl, isBookmarked, isTrending, media_type};

    return (
        <div className={`relative rounded-lg ${isTrending && !isSearch? 'h-36 min-w-60 lg:w-[470px] lg:h-64' : 'h-44 lg:h-60 w-full '}  overflow-hidden text-outfit`}>
            <img src={imageUrl} style={{pointerEvents: 'none'}} className={`absolute inset-0 ${isTrending && !isSearch? 'w-full h-full' : 'h-32 lg:h-48 w-full rounded-lg'} object-cover`} />
            <button 
                style={{zIndex: 1000}}
                onClick={() => {
                    console.log(`The button is being clicked! and moviename: ${thisMovie.title} and id ${id} and mediatype ${thisMovie.media_type}`)
                    onBookmarkClick(thisMovie)}}
                className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors"
            >
                <img src={isBookmarked ? bookmarkFullIcon : bookmarkEmptyIcon} alt="" srcset="" />
            </button>
                {/* <Bookmark 
                    size={20}
                    className={`text-white ${isBookmarked ? 'fill-white' : ''}`}
                /> */}
            <div className={`absolute inset-0 ${isTrending && !isSearch? 'bg-gradient-to-t from-black/75 to-transparent' : ''}`} />
            <div className={`absolute  ${isTrending && !isSearch? 'bottom-0 left-0 right-0 p-4' : 'bottom-0 left-0 right-0'} text-white`}>
                <div className={`flex flex-row gap-2 opacity-75 font-outfit text-body-s max-h-4 items-center font-light ${!isTrending && !isSearch ? 'bg-very-dark-blue': ''}`}>
                    <span>{year}</span>
                    <span>•</span>
                    <img src={category === 'movie' ? movieIcon : tvIcon} alt="" />
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <span>•</span>
                    <span>{rating}</span>
                </div>
                <span className="text-body-m">{title}</span>
            </div>
        </div>
    );
}