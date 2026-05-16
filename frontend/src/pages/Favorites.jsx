import "../css/Favorites.css";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Film, Search, ArrowRight } from "lucide-react";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <div className="empty-icon-container">
        <Film className="empty-icon film" size={48} />
        <Search className="empty-icon search" size={24} />
      </div>
      <h2>Your list is looking a bit lonely...</h2>
      <p>
        Explore more movies at the Home page or find your favorites using the search bar!
      </p>
      <Link to="/" className="explore-btn">
        Start Exploring <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export default Favorites;
