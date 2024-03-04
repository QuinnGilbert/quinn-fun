import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Example from "./pages/Example";
import Game from "./pages/Game";
import Ranges from "./pages/Ranges";
import Tetris from "./pages/Tetris";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/example" element={<Example />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/ranges" element={<Ranges />} />
        <Route path="/tetris" element={<Tetris />} />
      </Routes>
    </Router>
  );
}
