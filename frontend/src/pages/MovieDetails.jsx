import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useToast } from "../contexts/ToastContext";
import { ExternalLink, Star, Calendar, Clock, ArrowLeft } from "lucide-react";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load movie details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, showToast]);

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>
      
      <div className="movie-details-content">
        <div className="movie-details-poster">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        
        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.title}</h1>
          <p className="movie-details-tagline">{movie.tagline}</p>
          
          <div className="movie-details-meta">
            <div className="meta-item">
              <Star className="meta-icon star" size={18} />
              <span>{movie.vote_average.toFixed(1)} / 10</span>
            </div>
            <div className="meta-item">
              <Calendar className="meta-icon" size={18} />
              <span>{movie.release_date?.split("-")[0]}</span>
            </div>
            <div className="meta-item">
              <Clock className="meta-icon" size={18} />
              <span>{movie.runtime} min</span>
            </div>
          </div>
          
          <div className="movie-details-genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          
          <div className="movie-details-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          {movie.imdb_id && (
            <a 
              href={`https://www.imdb.com/title/${movie.imdb_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="imdb-link"
            >
              View on IMDB <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
