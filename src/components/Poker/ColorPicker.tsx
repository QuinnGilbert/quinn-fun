type Props = {
  color: string;
  action: string;
  setColor: Function;
};

export default function ColorPicker({
  color,
  action,
  setColor,
}: Props): JSX.Element {
  return (
    <div
      style={{
        justifyContent: "right",
        width: "100px",
        display: "flex",
        alignItems: "center",
        border: "1px solid lightgray",
        userSelect: "none",
      }}
      onClick={() => setColor(color)}
    >
      <div>{action}</div>
      <div
        style={{
          marginLeft: "10px",
          width: "10px",
          height: "10px",
          backgroundColor: color,
          border: "1px solid black",
        }}
      />
    </div>
  );
}
