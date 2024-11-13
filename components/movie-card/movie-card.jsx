import PropTypes from "prop-types";

//MovieCard function component
export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

//Defining prop constraints

