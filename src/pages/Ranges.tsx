import { useEffect, useState } from "react";
import Range from "../components/Poker/Range";
import CSS from "csstype";
import ControlPanel from "../components/Poker/ControlPanel";
import RangeSelector from "../components/Poker/RangeSelector";

const styles: CSS.Properties = {
  position: "absolute",
  left: "300px",
  top: "150px",
  display: "flex",
};

export default function Ranges(): JSX.Element {
  const [rangeColors, setRangeColors] = useState({});
  const [curName, setCurName] = useState("");
  const [ranges, setRanges] = useState(
    {} as Record<string, Record<string, string>>
  );
  const [color, setColor] = useState("indianred");
  const [rangeOrder, setRangeOrder] = useState([] as string[]);

  useEffect(() => {
    if (document.cookie === "")
      document.cookie =
        "New Range={};expiration=" + new Date("2030-01-01").toUTCString();
    const cookies = document.cookie.split(/; */);
    const newRanges: Record<string, Record<string, string> | string[]> = {};
    cookies.forEach((x) => {
      const name = x.split("=")[0];
      const value = x.split("=")[1];
      newRanges[name] = JSON.parse(value);
    });

    const newOrder = (newRanges["order"] ?? []) as string[];
    const newRangesInOrder: Record<string, Record<string, string>> = {};
    newOrder.forEach((x) => {
      newRangesInOrder[x] = newRanges[x] as Record<string, string>;
    });

    setRanges(newRangesInOrder);
    setRangeOrder(newOrder);
  }, []);

  return (
    <div style={styles}>
      <RangeSelector
        curName={curName}
        setCurName={setCurName}
        ranges={ranges}
        onClick={(x: string) => {
          setRangeColors(ranges[x]);
          setCurName(x);
        }}
        deleteRange={(key: string) => {
          const newRanges = { ...ranges };
          delete newRanges[key];
          setRanges(newRanges);
          const newRangeOrder = [...rangeOrder];
          const index = newRangeOrder.indexOf(key);
          newRangeOrder.splice(index, 1);
          setRangeOrder(newRangeOrder);

          saveRanges(newRanges, newRangeOrder);
          deleteRangeCookie(key);
        }}
        createRange={(key: string) => {
          if (ranges[key]) return;
          const newRanges = { ...ranges };
          newRanges[key] = {};
          setRanges(newRanges);
          setCurName(key);
          setRangeColors({});

          const newRangeOrder = [...rangeOrder];
          newRangeOrder.push(key);
          setRangeOrder(newRangeOrder);

          saveRanges(newRanges, newRangeOrder);
        }}
      />
      <Range
        curName={curName}
        ranges={ranges}
        saveRanges={saveRanges}
        setRanges={setRanges}
        rangeColors={rangeColors}
        setRangeColors={setRangeColors}
        color={color}
        rangeOrder={rangeOrder}
      />
      <ControlPanel
        rangeColors={rangeColors}
        setRangeColors={setRangeColors}
        curName={curName}
        ranges={ranges}
        setRanges={setRanges}
        saveRanges={saveRanges}
        setColor={setColor}
      />
    </div>
  );
}

function saveRanges(
  ranges: Record<string, Record<string, string>>,
  order: string[]
) {
  const expiration = new Date("2030-01-01");

  document.cookie =
    "order=" +
    JSON.stringify(order) +
    ";expires=" +
    expiration.toUTCString() +
    ";";
  console.log(order);
  console.log(JSON.stringify(order));
  Object.entries(ranges).forEach(([key, value]) => {
    document.cookie =
      key +
      "=" +
      JSON.stringify(value) +
      ";expires=" +
      expiration.toUTCString() +
      ";";
    console.log(
      JSON.stringify(value) + ";expires=" + expiration.toUTCString() + ";"
    );
  });
}

function deleteRangeCookie(key: string) {
  const expiration = new Date("2020-01-01");
  document.cookie = key + "={};expires=" + expiration.toUTCString() + ";";
}
