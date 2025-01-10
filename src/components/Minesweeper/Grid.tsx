import { useEffect, useState } from "react";
import Cell from "../Minesweeper/Cell";
import CSS from "csstype";

const n = 16;
const m = 30;
const numMines = 99;
export default function Grid(): JSX.Element {
  const styles: CSS.Properties = {
    height: `${n * 24}px`,
    width: `${m * 24}px`,
    display: "flex",
    flexWrap: "wrap",
  };

  const [initialized, setInitialized] = useState(false);

  const [grid, setGrid] = useState<number[][]>(
    Array(n)
      .fill(null)
      .map(() => Array(m).fill(0))
  );
  const [revealed, setRevealed] = useState(
    Array(n)
      .fill(null)
      .map(() => Array(m).fill(false))
  );
  const [flags, setFlags] = useState(
    Array(n)
      .fill(null)
      .map(() => Array(m).fill(false))
  );

  const [curX, setCurX] = useState(-1);
  const [curY, setCurY] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!initialized) return;
      if (event.key === " ") {
        if (curX !== -1 && curY !== -1) {
          if (!revealed[curX][curY]) {
            toggleFlag(
              grid,
              flags,
              setFlags,
              revealed,
              setRevealed,
              curX,
              curY
            );
          } else {
            revealAdjacent(grid, flags, revealed, setRevealed, curX, curY);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (initialized) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] >= 1 && grid[i][j] <= 9) count++;
      }
    }
    console.log(count);
  }

  return (
    <div style={styles}>
      {grid.map((row, rowIndex) => {
        return row.map((value, colIndex) => (
          <div
            onClick={() => {
              let tempGrid = grid;
              if (!initialized) {
                tempGrid = createBoard(rowIndex, colIndex);
                setGrid(tempGrid);
                setInitialized(true);
              }
              if (!flags[rowIndex][colIndex])
                revealCell(
                  rowIndex,
                  colIndex,
                  flags,
                  revealed,
                  setRevealed,
                  tempGrid
                );
            }}
            onMouseEnter={() => {
              setCurX(rowIndex);
              setCurY(colIndex);
            }}
            onMouseLeave={() => {
              setCurX(-1);
              setCurY(-1);
            }}
          >
            {
              <Cell
                value={
                  revealed[rowIndex][colIndex]
                    ? value.toString()
                    : flags[rowIndex][colIndex]
                    ? "flag"
                    : "closed"
                }
              />
            }
          </div>
        ));
      })}
    </div>
  );
}

function revealAdjacent(
  grid: number[][],
  flags: boolean[][],
  revealed: boolean[][],
  setRevealed: Function,
  x: number,
  y: number
): boolean[][] {
  console.log(x, y);
  if (!revealed[x][y]) return revealed;
  console.log("CHECK");
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i + x < 0 || j + y < 0 || i + x >= n || j + y >= m) continue;
      if (flags[i + x][j + y]) count++;
    }
  }
  console.log("count: ", count, grid[x][y]);
  if (count !== grid[x][y]) return revealed;

  let curRevealed = revealed;
  for (let rep = 0; rep < 8; rep++) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i + x < 0 || j + y < 0 || i + x >= n || j + y >= m) continue;
        if (!flags[i + x][j + y]) {
          curRevealed = revealCell(
            i + x,
            j + y,
            flags,
            curRevealed,
            setRevealed,
            grid
          );
        }
      }
    }
  }

  return curRevealed;
}

function toggleFlag(
  grid: number[][],
  flags: boolean[][],
  setFlags: Function,
  revealed: boolean[][],
  setRevealed: Function,
  rowIndex: number,
  colIndex: number
) {
  const res = JSON.parse(JSON.stringify(flags));
  res[rowIndex][colIndex] = !res[rowIndex][colIndex];
  setFlags(res);

  let curRevealed = revealed;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const x = i + rowIndex;
      const y = j + colIndex;
      if (x < 0 || y < 0 || x >= n || y >= m) continue;
      curRevealed = revealAdjacent(grid, res, curRevealed, setRevealed, x, y);
    }
  }
}

function revealCell(
  rowIndex: number,
  colIndex: number,
  flags: boolean[][],
  revealed: boolean[][],
  setRevealed: Function,
  grid: number[][]
): boolean[][] {
  console.log("reveal", rowIndex, colIndex);
  if (revealed[rowIndex][colIndex]) return revealed;

  const res = JSON.parse(JSON.stringify(revealed));
  res[rowIndex][colIndex] = true;

  if (grid[rowIndex][colIndex] === 0) {
    const q = [rowIndex * m + colIndex];
    console.log("init: ", q, rowIndex, colIndex);
    const dir = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    while (q.length !== 0) {
      const cur = q[0];
      q.splice(0, 1);

      const x = Math.floor(cur / m);
      const y = cur % m;
      console.log("bug: ", x, y);
      if (grid[x][y] !== 0) continue;

      dir.forEach((d) => {
        const nx = d[0] + x;
        const ny = d[1] + y;
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && !res[nx][ny]) {
          res[nx][ny] = true;
          q.push(nx * m + ny);
        }
      });
    }
  }

  setRevealed(res);

  let curRevealed = res;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const x = i + rowIndex;
      const y = j + colIndex;
      if (x < 0 || y < 0 || x >= n || y >= m) continue;
      curRevealed = revealAdjacent(grid, flags, curRevealed, setRevealed, x, y);
    }
  }

  return curRevealed;
}

function createBoard(startX: number, startY: number): number[][] {
  console.log(startX, startY);
  const selectedIndexes = new Set<number>();

  while (selectedIndexes.size < numMines) {
    const randomIndex = Math.floor(Math.random() * n * m);
    let check = false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const x = i + Math.floor(randomIndex / m);
        const y = j + (randomIndex % m);
        if (x === startX || y === startY) check = true;
      }
    }
    if (check) continue;
    selectedIndexes.add(randomIndex);
  }

  const grid: number[][] = [];
  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < m; j++) {
      if (selectedIndexes.has(i * m + j)) grid[i][j] = -1;
      else grid[i][j] = 0;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === -1) {
        for (let x = i - 1; x <= i + 1; x++) {
          if (x < 0 || x >= n) continue;
          for (let y = j - 1; y <= j + 1; y++) {
            if (y < 0 || y >= m) continue;
            if (grid[x][y] !== -1) grid[x][y]++;
          }
        }
      }
    }
  }

  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 0) count++;
    }
  }

  console.log("zeros: ", count);

  if (count > 81) {
    return createBoard(startX, startY);
  }

  console.log("generated: ", count);

  return grid;
  //   return grid.flat(1);
}
