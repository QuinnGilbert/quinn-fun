import { useNavigate } from "react-router-dom";
import CSS from "csstype";

const styles: CSS.Properties = {
  display: "flex",
  gap: "10px",
};

export default function Home(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={styles}>
      <button onClick={() => navigate("/game")}>2048</button>
      <button onClick={() => navigate("/ranges")}>Poker Ranges</button>
      <button onClick={() => navigate("/example")}>Example</button>
      <button onClick={() => navigate("/tetris")}>Tetris</button>
      <button onClick={() => navigate("/minesweeper")}>Minesweeper</button>
    </div>
  );
}
