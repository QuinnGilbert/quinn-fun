import { useEffect, useState } from "react";
import Cell from "./Cell";
import CSS from "csstype";

const styles: CSS.Properties = {
  position: "absolute",
  left: "550px",
  top: "100px",
  width: "415px",
  height: "415px",
  gap: "5px",
  display: "flex",
  flexWrap: "wrap",
  border: "solid 5px gray",
  borderRadius: "10px",
  backgroundColor: "gray",
};

export default function Grid(): JSX.Element {
  const [values, setvalues] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [0, 2, 0, 0],
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let next = JSON.parse(JSON.stringify(values));

      if (event.key === "ArrowLeft") next = moveLeft(values);
      if (event.key === "ArrowRight") next = moveRight(values);
      if (event.key === "ArrowUp") next = moveUp(values);
      if (event.key === "ArrowDown") next = moveDown(values);

      if (JSON.stringify(values) !== JSON.stringify(next)) {
        next = genRandom(next);
      }

      setvalues(next);

      console.log(values);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      <div style={styles}>
        {values.map((values) => values.map((value) => <Cell value={value} />))}
      </div>
    </div>
  );
}

function moveLeft(values: number[][]): number[][] {
  const res = JSON.parse(JSON.stringify(values));

  for (let i = 0; i < values.length; i++) {
    let previ = -1;
    let prev = -1;
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] !== 0) {
        res[i][j] = 0;
        if (values[i][j] === prev) {
          res[i][previ] = 2 * values[i][j];
          prev = -1;
        } else {
          res[i][previ + 1] = values[i][j];
          previ = previ + 1;
          prev = values[i][j];
        }
      }
    }
  }

  return res;
}

function moveRight(values: number[][]): number[][] {
  const res = JSON.parse(JSON.stringify(values));

  for (let i = 0; i < values.length; i++) {
    let previ = values[i].length;
    let prev = -1;
    for (let j = values[i].length - 1; j >= 0; j--) {
      if (values[i][j] !== 0) {
        res[i][j] = 0;
        if (values[i][j] === prev) {
          res[i][previ] = 2 * values[i][j];
          prev = -1;
        } else {
          res[i][previ - 1] = values[i][j];
          previ = previ - 1;
          prev = values[i][j];
        }
      }
    }
  }

  return res;
}

function moveUp(values: number[][]): number[][] {
  const res = JSON.parse(JSON.stringify(values));

  for (let i = 0; i < values.length; i++) {
    let previ = -1;
    let prev = -1;
    for (let j = 0; j < values[i].length; j++) {
      if (values[j][i] !== 0) {
        res[j][i] = 0;
        if (values[j][i] === prev) {
          res[previ][i] = 2 * values[j][i];
          prev = -1;
        } else {
          res[previ + 1][i] = values[j][i];
          previ = previ + 1;
          prev = values[j][i];
        }
      }
    }
  }

  return res;
}

function moveDown(values: number[][]): number[][] {
  const res = JSON.parse(JSON.stringify(values));

  for (let i = 0; i < values.length; i++) {
    let previ = values[i].length;
    let prev = -1;
    for (let j = values[i].length - 1; j >= 0; j--) {
      if (values[j][i] !== 0) {
        res[j][i] = 0;
        if (values[j][i] === prev) {
          res[previ][i] = 2 * values[j][i];
          prev = -1;
        } else {
          res[previ - 1][i] = values[j][i];
          previ = previ - 1;
          prev = values[j][i];
        }
      }
    }
  }

  return res;
}

function genRandom(values: number[][]): number[][] {
  const res = JSON.parse(JSON.stringify(values));

  const indexes = [];
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (values[i][j] === 0) indexes.push([i, j]);
    }
  }

  if (indexes.length !== 0) {
    const four = Math.floor(Math.random() * 10) === 0;
    const index = Math.floor(Math.random() * indexes.length);
    res[indexes[index][0]][indexes[index][1]] = four ? 4 : 2;
  }

  return res;
}
