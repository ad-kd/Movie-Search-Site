import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieProviders } from "../services/api";
import { useToast } from "../contexts/ToastContext";
import { useMovieContext } from "../contexts/MovieContext";
import { ExternalLink, Star, Calendar, Clock, ArrowLeft, Heart } from "lucide-react";
import "../css/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  
  const favorite = movie ? isFavorite(movie.id) : false;

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
      showToast(`${movie.title} added to favorites`, "success");
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        
        const providersData = await getMovieProviders(id);
        if (providersData && Object.keys(providersData).length > 0) {
          const providerInfo = providersData.US || providersData[Object.keys(providersData)[0]];
          setProviders(providerInfo || {});
        } else {
          setProviders({});
        }
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
          
          <div className="movie-details-actions">
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
            
            <button 
              className={`details-fav-btn ${favorite ? "active" : ""}`} 
              onClick={onFavoriteClick}
            >
              <Heart size={20} fill={favorite ? "currentColor" : "none"} />
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>

          {providers !== null && (
            <div className="streaming-section">
              <h4 className="streaming-title">STREAMING</h4>
              {providers.flatrate || providers.rent || providers.buy ? (
                <div className="streaming-providers">
                  {(providers.flatrate || providers.rent || providers.buy).slice(0, 3).map((provider) => {
                    const getProviderLink = (providerName, movieTitle) => {
                      const titleQuery = encodeURIComponent(movieTitle);
                      const name = providerName.toLowerCase();
                      
                      let domain = "";
                      if (name.includes('netflix')) domain = 'netflix.com';
                      else if (name.includes('amazon') || name.includes('prime')) domain = 'primevideo.com';
                      else if (name.includes('disney')) domain = 'disneyplus.com';
                      else if (name.includes('hulu')) domain = 'hulu.com';
                      else if (name.includes('apple')) domain = 'tv.apple.com';
                      else if (name.includes('hbo') || name.includes('max')) domain = 'max.com';
                      else if (name.includes('peacock')) domain = 'peacocktv.com';
                      else if (name.includes('paramount')) domain = 'paramountplus.com';
                      else domain = 'justwatch.com';

                      // Use DuckDuckGo "I'm Feeling Lucky" (\) for direct navigation
                      return `https://duckduckgo.com/?q=%5C${titleQuery}+site%3A${domain}`;
                    };

                    return (
                      <a
                        key={provider.provider_id}
                        href={getProviderLink(provider.provider_name, movie.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="provider-link"
                        title={provider.provider_name}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="provider-logo"
                        />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className="no-streaming-text">This ain't release in OTT</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
