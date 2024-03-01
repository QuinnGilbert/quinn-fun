import CSS from "csstype";
import { Hands } from "./Constants";

type Props = {
  rangeColors: Record<string, string>;
};

export default function MiniRange({ rangeColors }: Props): JSX.Element {
  return (
    <div
      style={
        {
          width: "52px",
          height: "52px",
          border: "1px solid black",
          margin: "2px",

          // padding: "2px",
        } as CSS.Properties
      }
    >
      {Hands.map((row) => (
        <div style={{ display: "flex" } as CSS.Properties}>
          {row.map((x) => (
            <div
              style={
                {
                  height: "4px",
                  width: "4px",
                  backgroundColor: rangeColors[x] ?? "white",
                } as CSS.Properties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
