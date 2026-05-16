import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import {searchMovies,getPopularMovies} from "../services/api";
import "../css/Home.css";
import SplitText from "../components/reactbits/SplitText";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      if (!searchQuery.trim()) {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to search movies...");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

{/* Author: adkd */}


  return (
    <div className="home">
      <div className="welcome-section">
        <SplitText text="Discover Your Next Favorite Movie" className="welcome-title" delay={0.05} />
        <p className="welcome-subtitle">Search through thousands of movies and save your favorites</p>
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

        {error && <div className="error-message">{error}</div>}
{/* Author: adkd */}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="no-results">No movies found...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
