import CSS from "csstype";
import { cellSize } from "./Constants";
import { MouseEventHandler } from "react";

type Props = {
  value: string;
  painted?: boolean;
  onMove: MouseEventHandler<HTMLDivElement>;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onMouseOver?: MouseEventHandler<HTMLDivElement>;
  color?: string;
};

export default function Cell({
  value,
  painted = false,
  onMove,
  onMouseDown,
  onMouseOver,
  color,
}: Props): JSX.Element {
  const styles: CSS.Properties = {
    display: "flex",
    width: cellSize + "px",
    height: cellSize + "px",
    fontSize: "10px",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
    // justifyItems: "center",
    border: "solid 1px black",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color ?? "white",
    userSelect: "none",
  };

  return (
    <div
      style={styles}
      onMouseMove={onMove}
      onMouseDown={onMove}
      onMouseOver={onMouseOver}
    >
      {value}
    </div>
  );
}
