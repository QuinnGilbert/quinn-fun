import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import { InitialGrid, blocks } from "./Constants";

export default function Board(): JSX.Element {
  const [placed, setPlaced] = useState(InitialGrid);
  const [loc, setLoc] = useState([0, 4]);
  const [curBlock, setCurBlock] = useState(
    blocks[Math.floor(Math.random() * 7)]
  );

  function callback() {
    moveDown(loc, setLoc, grid, setPlaced, curBlock, setCurBlock, placed);
  }
  const savedCallback = useRef(callback);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("CHECK");
      savedCallback.current();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveLeft(loc, setLoc, curBlock, placed);
      if (event.key === "ArrowRight") moveRight(loc, setLoc, curBlock, placed);
      if (event.key === "ArrowDown")
        moveDown(loc, setLoc, grid, setPlaced, curBlock, setCurBlock, placed);
      if (event.key === "ArrowUp") rotateClockWise(curBlock, setCurBlock);
      if (event.key === "z") rotateCounterClockWise(curBlock, setCurBlock);
      if (event.key === " ")
        hardDrop(loc, setLoc, setPlaced, curBlock, setCurBlock, placed);
    };

    savedCallback.current = callback;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // TODO: add ghost pieces
  const grid: number[][] = JSON.parse(JSON.stringify(placed));
  for (let i = 0; i < curBlock.length; i++) {
    for (let j = 0; j < curBlock[i].length; j++) {
      if (i + loc[0] < 20 && j + loc[1] < 10 && j + loc[1] >= 0)
        if (curBlock[i][j] !== 0) grid[i + loc[0]][j + loc[1]] = curBlock[i][j];
    }
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100px",
        height: "200px",
        flexWrap: "wrap",
      }}
    >
      {grid.map((row) => row.map((x) => <Cell value={x} />))}

      <button style={{ marginTop: "100px" }} onClick={() => {}}>
        Generate Piece
      </button>
    </div>
  );
}

function moveLeft(
  loc: number[],
  setLoc: Function,
  curBlock: number[][],
  placed: number[][]
) {
  const newLoc = [loc[0], loc[1] - 1];
  if (!inBounds(newLoc, curBlock, placed)) return;
  setLoc(newLoc);
}
function moveRight(
  loc: number[],
  setLoc: Function,
  curBlock: number[][],
  placed: number[][]
) {
  const newLoc = [loc[0], loc[1] + 1];
  if (!inBounds(newLoc, curBlock, placed)) return;
  setLoc(newLoc);
}
function moveDown(
  loc: number[],
  setLoc: Function,
  grid: number[][],
  setPlaced: Function,
  curBlock: number[][],
  setCurBlock: Function,
  placed: number[][]
) {
  const newLoc = [loc[0] + 1, loc[1]];
  if (!inBounds(newLoc, curBlock, placed)) {
    // TODO: change to copy placed instead of grid, since grid will have ghost pieces
    setPlaced(grid);
    clearLines(grid, setPlaced);
    newPiece(setLoc, setCurBlock);
    return;
  }

  setLoc(newLoc);
}
function hardDrop(
  loc: number[],
  setLoc: Function,
  setPlaced: Function,
  curBlock: number[][],
  setCurBlock: Function,
  placed: number[][]
) {
  let newLoc = [loc[0] + 1, loc[1]];
  while (inBounds(newLoc, curBlock, placed)) {
    newLoc = [newLoc[0] + 1, newLoc[1]];
  }
  newLoc = [newLoc[0] - 1, newLoc[1]];
  for (let i = 0; i < curBlock.length; i++) {
    for (let j = 0; j < curBlock[i].length; j++) {
      if (curBlock[i][j] !== 0)
        placed[i + newLoc[0]][j + newLoc[1]] = curBlock[i][j];
    }
  }
  setPlaced(placed);
  clearLines(placed, setPlaced);
  newPiece(setLoc, setCurBlock);
}
function inBounds(
  loc: number[],
  curBlock: number[][],
  placed: number[][]
): boolean {
  for (let i = 0; i < curBlock.length; i++) {
    for (let j = 0; j < curBlock[i].length; j++) {
      if (
        curBlock[i][j] !== 0 &&
        (i + loc[0] >= InitialGrid.length ||
          i + loc[0] < 0 ||
          j + loc[1] >= InitialGrid[i].length ||
          j + loc[1] < 0 ||
          placed[i + loc[0]][j + loc[1]] !== 0)
      ) {
        return false;
      }
    }
  }
  return true;
}
// TODO: Add check to not rotate into other pieces
// TODO (nit): Add jumping mechanic for turning
function rotateClockWise(curBlock: number[][], setCurBlock: Function) {
  const res = JSON.parse(JSON.stringify(curBlock));
  for (let i = 0; i < curBlock.length; i++) {
    for (let j = 0; j < curBlock[i].length; j++) {
      res[i][j] = curBlock[curBlock[i].length - 1 - j][i];
    }
  }
  setCurBlock(res);
}
function rotateCounterClockWise(curBlock: number[][], setCurBlock: Function) {
  const res = JSON.parse(JSON.stringify(curBlock));
  for (let i = 0; i < curBlock.length; i++) {
    for (let j = 0; j < curBlock[i].length; j++) {
      res[i][j] = curBlock[j][curBlock[i].length - 1 - i];
    }
  }
  setCurBlock(res);
}
function newPiece(setLoc: Function, setCurBlock: Function) {
  setLoc([0, 4]);
  setCurBlock(blocks[Math.floor(Math.random() * 7)]);
}
function clearLines(placed: number[][], setPlaced: Function) {
  const cleared = [];
  for (let i = 0; i < placed.length; i++) {
    let check = true;
    for (let j = 0; j < placed[i].length; j++) {
      if (placed[i][j] === 0) check = false;
    }
    if (check) cleared.push(i);
  }

  const newPlaced = [...InitialGrid];
  let below = 0;
  for (let i = placed.length - 1; i >= 0; i--) {
    if (cleared.includes(i)) {
      below++;
      continue;
    }
    for (let j = 0; j < placed[i].length; j++) {
      newPlaced[i + below][j] = placed[i][j];
    }
  }
  setPlaced(newPlaced);
}
