import {createRoot} from "react-dom/client";
import {MainView} from "../components/main-view/main-view";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
// Import statement to indicate the need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// Finds the root
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);