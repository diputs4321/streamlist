import { useState } from "react";

function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = "514868235808633632116c09bf5de06b";

  const searchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await response.json();
    setMovies(data.results);
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "150px" }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
