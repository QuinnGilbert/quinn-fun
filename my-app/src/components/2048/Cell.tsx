import CSS from "csstype";

type Props = {
  value: number;
};

export default function Cell({ value }: Props): JSX.Element {
  const styles: CSS.Properties = {
    borderRadius: "5px",
    display: "flex",
    width: "100px",
    height: "100px",
    fontSize: "50px",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: getColor(value),
  };

  return <div style={styles}>{value === 0 ? "" : value}</div>;
}

function getColor(value: number): string {
  if (value === 0) return "silver";
  if (value === 2) return "ivory";
  if (value === 4) return "lightyellow";
  if (value === 8) return "orange";
  if (value === 16) return "darkorange";
  if (value === 32) return "salmon";
  if (value === 64) return "red";
  return "yellow";
}
