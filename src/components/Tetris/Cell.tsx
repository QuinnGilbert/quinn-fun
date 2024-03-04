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

  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: colors[value],
        boxSizing: "border-box",
        border: "dotted 1px",
      }}
    ></div>
  );
}
