import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//MovieCard function component
export const MovieCard = ({movie}) => {
  const isFavoriteAlready = user?.FavoriteMovies?.includes(movie.id) || false;
  const [isFavorite, setIsFavorite] = useState(isFavoriteAlready);

  const handleFavoriteToggle = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please log in to manage favorites");
      return;
    }

    const method = isFavorite ? "DELETE" : "POST";
    const url = `https://jub-flix-e9807f9b5fd0.herokuapp.com/users/${user.Username}/movies/${movie.id}`;

    fetch(url,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token},`
        },
      }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json()
        .then((err) => 
          Promise.reject(`Failed to update favorites: ${err.errors?.[0]?.msg || "Unknown error"}`));
      }
    })
    .then((updatedUser) => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsFavorite(!isFavorite);
      alert(isFavorite ? "Movie removed from favorites" : "Movie added to favorites");
    })
    .catch((error) => {
      console.error("Error updating favorites: ", error);
    });
  };

  return (
    <Card className="h-100" variant="link">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to ={`/movies/${movie.id}`}>
          <Button variant="primary">Open</Button>
        </Link>
        <Button 
          variant={isFavorite ? "danger" : "success"} 
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "Remove from Favorites" : "Add to favorites"}
        </Button>
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
  }).isRequired
};