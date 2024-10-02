import React from 'react';
import { Link } from 'react-router-dom';
import movieImage from "../../assets/icon-nav-movies.svg";
import bookmarkImage from "../../assets/icon-nav-bookmark.svg";
import homeImage from "../../assets/icon-nav-home.svg";
import movieImageNav from "../../assets/icon-nav-movies.svg";
import tvImage from "../../assets/icon-nav-tv-series.svg";
import avatar from "../../assets/User-avatar.png";

export default function Navbar({ currentCategory }) {
  const getNavItemClass = (category) => {
    return `transition-all duration-300 ${currentCategory === category ? 'brightness-0 invert' : 'opacity-50 hover:opacity-100'}`;
  };

  return (
    <div className="z-10 flex flex-row lg:flex-col justify-between bg-semi-dark-blue rounded-2xl max-h-14 p-4 items-center align-stretch lg:max-h-screen lg:h-5/6">
      <img src={movieImage} className="text-main-red" alt="Logo" />
      <div className="flex lg:flex-col flex-row gap-4">
        <Link to="/"><img src={homeImage} className={`${getNavItemClass("all")} fill-red`} alt="Home" /></Link>
        <Link to="/movies"><img src={movieImageNav} className={getNavItemClass("Movie")} alt="Movies" /></Link>
        <Link to="/tvseries"><img src={tvImage} className={getNavItemClass("TV Series")} alt="TV Series" /></Link>
        <Link to="/bookmark"><img src={bookmarkImage} className={getNavItemClass("bookmarked")} alt="Bookmarks" /></Link>
      </div>
      <Link to="/login">
        <div className="bg-white rounded-full p-1"><img src={avatar} alt="User Avatar" className="h-8"/></div>
      </Link>
    </div>
  );
}