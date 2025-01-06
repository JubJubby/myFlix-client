import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//MovieCard function component
export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(book)} variant="link">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button>Open</Button>
      </Card.Body>
    </Card>
  );
};

//Defining prop constraints
MovieCard.PropTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
