const values = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
export const Hands: string[][] = [];
for (var i = 0; i < 13; i++) {
  Hands[i] = [];
  for (var j = 0; j < 13; j++) {
    if (i > j) {
      Hands[i][j] = values[j] + values[i] + "o";
    } else if (i === j) {
      Hands[i][j] = values[i] + values[j];
    } else {
      Hands[i][j] = values[i] + values[j] + "s";
    }
  }
}

export const cellSize = 30;
export const gapSize = 1;
