import { useState } from "react";
import "../styles/common.css";

type Props = {
  overrideShow?: boolean;
  overrideSetShow?: Function;
  content: string;
  heading: string;
};

export default function MyDropdown({
  overrideShow,
  overrideSetShow,
  content,
  heading,
}: Props): JSX.Element {
  const [showContent, setShowContent] = useState(false);
  return (
    <div className="dropdown-wrapper">
      <div
        onClick={() => {
          overrideSetShow ?? setShowContent(!showContent);
        }}
      >
        {heading}
      </div>
      {overrideShow ??
        (showContent && <div className="dropdown">{content}</div>)}
    </div>
  );
}
