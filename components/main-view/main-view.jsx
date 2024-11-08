import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      genre: "Sci-Fi",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRqhsSA3e6Kw-EAbjneujrnhXKq7Ugl5L5Wh0yyLC92qimzfJw",
      director: "Christopher Nolan",
    },
    {
        id: 2,
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through.",
        genre: "Genre",
        image:
          "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTRQY22fAfc4eI-8Fpg12E7d7O68wz0uqJvXHunh8l3Xbg1T6Np",
        director: "Frank Darabont",
      },
      {
        id: 3,
        title: "Gladiator",
        description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        genre: "Adventure",
        image:
          "https://m.media-amazon.com/images/I/51GA6V6VE1L.jpg",
        director: "Ridley Scott",
      },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
