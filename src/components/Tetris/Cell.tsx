type Props = {
  value: number;
};

export default function Cell({ value }: Props): JSX.Element {
  const colors = [
    "gray",
    "lightblue",
    "blue",
    "orange",
    "yellow",
    "green",
    "purple",
    "red",
  ];

  const opacity = value < 0 ? 0.5 : 1;

  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: colors[Math.abs(value)],
        boxSizing: "border-box",
        border: "dotted 1px",
        opacity: opacity,
      }}
    ></div>
  );
}
