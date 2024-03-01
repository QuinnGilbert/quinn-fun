import CSS from "csstype";
import { Hands, cellSize } from "./Constants";
import Cell from "./Cell";

const styles: CSS.Properties = {
  width: 13 * cellSize + "px",
  height: 13 * cellSize + "px",
  display: "flex",
  flexWrap: "wrap",
  border: "solid 5px gray",
  userSelect: "none",
};

type Props = {
  curName: string;
  ranges: Record<string, Record<string, string>>;
  setRanges: Function;
  saveRanges: Function;
  rangeColors: Record<string, string>;
  setRangeColors: Function;
  color: string;
  rangeOrder: string[];
};

export default function Range({
  curName,
  ranges,
  setRanges,
  saveRanges,
  rangeColors,
  setRangeColors,
  color,
  rangeOrder,
}: Props): JSX.Element {
  const grid = Hands.map((row) =>
    row.map((x) => (
      <Cell
        value={x}
        onMove={() => {
          if (!document.body.matches(":active")) return;
          console.log(x + " " + color);
          const newRangeColors = { ...rangeColors };
          newRangeColors[x] = color;
          setRangeColors(newRangeColors);

          const newRanges = { ...ranges };
          newRanges[curName] = newRangeColors;
          saveRanges(newRanges, rangeOrder);
          setRanges(newRanges);
        }}
        color={rangeColors[x]}
      />
    ))
  );

  return <div style={styles}>{grid}</div>;
}
