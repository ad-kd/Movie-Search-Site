import "../css/MovieCard.css"
import { Link } from "react-router-dom"
import { useMovieContext } from "../contexts/MovieContext"
import { useToast } from "../contexts/ToastContext"
import SpotlightCard from "./reactbits/SpotlightCard"

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const { showToast } = useToast()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        e.stopPropagation() // Prevent triggering the link
        if (favorite) {
            removeFromFavorites(movie.id)
        } else {
            addToFavorites(movie)
            showToast(`${movie.title} added to favorites`, "success")
        }
    }

    return (
        <SpotlightCard className="movie-card" spotlightColor="rgba(100, 108, 255, 0.2)">
            <Link to={`/movie/${movie.id}`} className="movie-card-link">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                </div>
            </Link>
        </SpotlightCard>
    )
}

export default MovieCard