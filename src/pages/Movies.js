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
    <div style={{ padding: "2rem" }}>
      <h1>Search Movies</h1>

      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchMovies}>Search</button>

      {error && <p>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "180px" }}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "270px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ccc",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                No Poster Available
              </div>
            )}

            <p><strong>{movie.title}</strong></p>
            <p>{movie.release_date || "No release date"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;