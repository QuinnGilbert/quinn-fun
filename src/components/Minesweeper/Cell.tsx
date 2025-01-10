import CSS from "csstype";

export default function Grid({ value }: { value: string }): JSX.Element {
  const styles: CSS.Properties = {
    width: "24px",
    height: "24px",
    backgroundSize: "100%",
    backgroundImage: `url('${getURL(value)}')`,
  };

  return <div style={styles} />;
}

function getURL(value: string): string {
  switch (value) {
    case "closed":
      return "/images/closed.svg";
    case "flag":
      return "/images/flag.svg";
    case "-1":
      return "images/mine.svg";
    case "0":
      return "/images/type0.svg";
    case "1":
      return "/images/type1.svg";
    case "2":
      return "/images/type2.svg";
    case "3":
      return "/images/type3.svg";
    case "4":
      return "/images/type4.svg";
    case "5":
      return "/images/type5.svg";
    case "6":
      return "/images/type6.svg";
    case "7":
      return "/images/type7.svg";
    case "8":
      return "/images/type8.svg";
  }
  return "";
}
