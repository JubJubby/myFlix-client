import {createRoot} from "react-dom/client";

// Import statement to indicate the need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <div className="myFlix">
            <div>Good Morning</div>
        </div>
    );
};

// Finds the root
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);