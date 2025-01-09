import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import { Navigate } from "react-router";

export const ProfileView = () => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    // const favoriteMovies = movies.filter((movie) => {
    //     return localUser.FavoriteMovies.includes(movie._id);
    // });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState("");
  
    const handleDeleteFavoriteMovie = (event) => {
        event.preventDefault();
        
        fetch("https://jub-flix-e9807f9b5fd0.herokuapp.com/users/:id/:movieTitle", {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (!response.ok) {
                alert("Movie not in favorites");
            } else {
                favoriteMovies = movies.filter((movie) => {
                    return localUser.FavoriteMovies.includes(movie._id);
                });
            }
        })
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      };
  
      fetch("https://jub-flix-e9807f9b5fd0.herokuapp.com/users/:Username", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          alert("Singup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      });

      fetch("https://jub-flix-e9807f9b5fd0.herokuapp.com/users/:Username", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          alert("Delete successful");
          window.location.reload();
        } else {
          alert("Delete failed");
        }
      });
    };

    const handleLogout = () => {
        onLoggedOut();
    }
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Enter a username"
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            placeholder="Enter a password"
          />
        </Form.Group>
  
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter an email"
          />
        </Form.Group>
  
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {
            localUser && favoriteMovies.Map((movie) => (
                <MovieCard movie={movie} />
            ))
        }
      </Form>
    );
  };
  