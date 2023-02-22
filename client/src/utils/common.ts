export const replace = (board: string, index: number) => {
  return `${board.substring(0, index)}${`x`}${board.substring(index + 1)}`;
};

export const computePlayer = () => (Math.floor(Math.random() * 2) ? "o" : "x");
