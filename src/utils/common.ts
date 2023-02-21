export const isValidBoard = (board: any) => {
  const arr = board.split("");
  let isValid = true;

  for (let el of arr) {
    if (
      el.toLowerCase() !== "x" &&
      el.toLowerCase() !== "o" &&
      el.toLowerCase() !== " "
    ) {
      isValid = false;
      break;
    }
  }

  return isValid;
};

const randomMove = (length: number) => {
  return Math.floor(Math.random() * (length + 1));
};

const computePlayer = (row: string[]) => {
  let playerPoints = { x: 0, o: 0 };

  for (let i of row) {
    playerPoints = {
      ...playerPoints,
      //@ts-ignore
      [i]: playerPoints[i] + 1,
    };
  }

  const { x, o } = playerPoints;

  if (x === 3) {
    return "x";
  }
  if (o === 3) {
    return "o";
  }
  return null;
};

export const fetchWinner = (board: string) => {
  let winner = null;
  const formattedBoard = [
    board.slice(0, 3).split(""),
    board.slice(3, 6).split(""),
    board.slice(6, 9).split(""),
  ];

  for (let row of formattedBoard) {
    winner = computePlayer(row);
    if (winner) return winner;
  }

  for (let i = 0; i < formattedBoard.length; i++) {
    const col = formattedBoard.map((el, j) => formattedBoard[j][i]);
    winner = computePlayer(col);
    if (winner) return winner;
  }

  const diagonals = [
    formattedBoard.map((_, index) => formattedBoard[index][index]),
    formattedBoard.map(
      (el, index) => formattedBoard[index][formattedBoard.length - 1 - index]
    ),
  ];

  for (let diagonal of diagonals) {
    winner = computePlayer(diagonal);
    if (winner) return winner;
  }

  return winner;
};

export const isTie = (board: string) => {
  let tie = true;

  const formattedBoard = [
    board.slice(0, 3).split(""),
    board.slice(3, 6).split(""),
    board.slice(6, 9).split(""),
  ];

  const isWinner = fetchWinner(board);

  if (!isWinner) {
    for (let arr of formattedBoard) {
      if (arr.includes(" ")) {
        tie = false;
      }
    }
  } else {
    tie = false;
  }

  return tie;
};

export const nextMove = (board: string) => {
  const freeSpot = board
    .split("")
    .map((spot: string, index: number) => (spot === " " ? index : null))
    .filter((index) => index);

  const nextMove = randomMove(freeSpot.length - 1);

  return `${board.substring(0, freeSpot[nextMove]!)}${`o`}${board.substring(
    freeSpot[nextMove]! + 1
  )}`;
};
