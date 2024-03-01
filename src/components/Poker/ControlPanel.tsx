import CSS from "csstype";
import ColorPicker from "./ColorPicker";

type Props = {
  rangeColors: Record<string, string>;
  setRangeColors: Function;
  curName: string;
  ranges: Record<string, Record<string, string>>;
  setRanges: Function;
  saveRanges: Function;
  setColor: Function;
};

const styles: CSS.Properties = {
  height: "398px",
  width: "188px",
  display: "flex",
  border: "1px solid black",
  flexDirection: "column",
};

export default function ControlPanel({
  rangeColors,
  setRangeColors,
  curName,
  ranges,
  setRanges,
  saveRanges,
  setColor,
}: Props): JSX.Element {
  return (
    <div style={styles}>
      <div
        style={
          {
            border: "solid black 1px",
            height: "100%",
          } as CSS.Properties
        }
      >
        Combos:{" "}
        {combos(rangeColors).toString() +
          " (" +
          (combos(rangeColors) / 1326).toLocaleString("en", {
            style: "percent",
            maximumFractionDigits: 2,
          }) +
          ")"}
        <ColorPicker color="White" action="Fold" setColor={setColor} />
        <ColorPicker color="lightgreen" action="Call" setColor={setColor} />
        <ColorPicker color="IndianRed" action="Raise" setColor={setColor} />
      </div>

      <div
        style={
          {
            textAlign: "center",
            border: "solid black 1px",
          } as CSS.Properties
        }
      >
        <button
          style={
            {
              width: "75px",
              justifyContent: "center",
              float: "right",
            } as CSS.Properties
          }
          onClick={() => {
            setRangeColors({});
            const newRanges = ranges;
            newRanges[curName] = {};
            setRanges(ranges);
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function combos(set: Record<string, string>): number {
  var count = 0;
  Object.keys(set).forEach((key) => {
    console.log(key + " " + set[key]);
    if (set[key] === "White") return;
    if (key.length === 2) count += 6;
    else if (key[2] === "s") count += 4;
    else count += 12;
  });
  return count;
}
