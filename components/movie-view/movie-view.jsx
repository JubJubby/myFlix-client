import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({movie, onBackClick}) => {
  return (
    <Container>
      <Row className="w-100">
        <img src={movie.image} />
      </Row>
      <Row className="w-100">
        <Col>
          <span>Title: </span>
          <span>{movie.title}</span>
        </Col>
        <Col>
          <span>Description: </span>
          <span>{movie.discription}</span>
        </Col>
        <Col>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </Col>
        <Col>
          <span>Director: </span>
          <span>{movie.director}</span>
        </Col>
        <Row className="w-10">
          <button className="back-button" onClick={onBackClick}>Back</button>
        </Row>
      </Row>
    </Container>
  );
};
