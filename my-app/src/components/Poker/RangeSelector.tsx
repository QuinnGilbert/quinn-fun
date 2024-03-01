import CSS from "csstype";
import MiniRange from "./MiniRange";
import React, { useState } from "react";

const styles: React.CSSProperties = {
  height: "398px",
  width: "198px",
  border: "solid 1px black",
  display: "flex",
  flexDirection: "column",
  //   padding: "2px",
  margin: "2px",
};

type Props = {
  curName: string;
  setCurName: Function;
  ranges: Record<string, Record<string, string>>;
  onClick: Function;
  deleteRange: Function;
  createRange: Function;
};

export default function RangeSelector({
  curName,
  setCurName,
  ranges,
  onClick,
  deleteRange,
  createRange,
}: Props): JSX.Element {
  const [tempName, setTempName] = useState("");

  return (
    <div style={styles}>
      <div style={{ height: "100%", border: "1px solid black" }}>
        {Object.entries(ranges).map(([key, value]) => {
          return (
            <div
              style={
                {
                  border: "1px gray solid",
                  display: "flex",
                  backgroundColor: key === curName ? "#a3a3a3" : undefined,
                } as CSS.Properties
              }
              onClick={() => onClick(key)}
            >
              <div
                style={{
                  paddingLeft: "2px",
                  flex: "1",
                  // width: "100%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  // border: "1px solid black",
                }}
              >
                {key}
              </div>
              <MiniRange rangeColors={value} />
              <button
                style={
                  {
                    // marginTop: "10px",
                    // marginBottom: "10px",
                    align: "center",
                    verticalAlign: "center",
                  } as CSS.Properties
                }
                onClick={() => deleteRange(key)}
              >
                D
              </button>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2px",
          marginTop: "2px",
        }}
      >
        <input
          style={{ width: "80%", alignItems: "center" }}
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            createRange(tempName);
            setTempName("");
          }}
        />
        <button
          style={{}}
          onClick={() => {
            createRange(tempName);
            setTempName("");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
