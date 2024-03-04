import Board from "../components/Tetris/Board";

export default function Tetris(): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Board />
    </div>
  );
}
