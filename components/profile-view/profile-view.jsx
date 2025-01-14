import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import React from "react";
import { Navigate } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const ProfileView = ({ onLoggedOut }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(localUser?.Username || "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(localUser?.email || "");
    const [birthday, setBirthday] = useState(localUser?.Birthday || "");
    
    
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      };
  
      fetch(`https://jub-flix-e9807f9b5fd0.herokuapp.com/users/${localUser.Username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json()
          .then((err) => 
            Promise.reject(
              `Update failed: ${err.errors?.[0]?.msg || "Unknown error"}`
            ));
        }
      })
      .then((updatedUser) => {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("Updated user:", updatedUser);
      })
      .catch((error) => console.error("Error updating profile:", error));
    };

    const handleDeleteProfile = () => {
      fetch(`https://jub-flix-e9807f9b5fd0.herokuapp.com/users/${localUser.Username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }).then((response) => {
        if (response.ok) {
          alert("Profile deleted successfully");
          localStorage.clear();
          onLoggedOut();
        } else {
          return response.json()
          .then((err) => 
            Promise.reject(
              `Delete failed: ${err.errors?.[0]?.msg || "Unknown error"}`
            ));
        }
      })
      .catch((error) => console.error("Error deleting profile:", error));
    };

    const handleLogout = () => {
        onLoggedOut();
    }
  
    return (
      <div className="profile-view">
        <h1>Profile</h1>
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
            Update Profile
          </Button>
        </Form>

        <Button variant="secondary" onClick={onLoggedOut}>
            Logout
        </Button>

        <Button variant="danger" onClick={handleDeleteProfile}>
          Delete Profile
        </Button>

        <h1>Favorite Movies</h1>
        <Row className="w-100">
          {favoriteMovie.length > 0 ? (
            favoriteMovies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={3}>
                <MovieCard movie={movie} />
              </Col>
            ))
          ) : (
            <>You do not have any favorite movies yet</>
          )
        }
        </Row>
      </div>
    );
  };
  