import { useState } from "react";

function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const searchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie title.");
      setMovies([]);
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("There was a problem loading movies.");
      setMovies([]);
    }
  };

  return (
    <main className="movies-page">
      <h1>Search Movies</h1>

      <div className="movie-search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p>{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <article key={movie.id} className="movie-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}

            <p><strong>{movie.title}</strong></p>
            <p>{movie.release_date || "No release date"}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Movies;