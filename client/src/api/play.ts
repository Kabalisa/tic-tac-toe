import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const playGame = async (board: string) => {
  return await axios.get(`${REACT_APP_API_URL}/play?board=${board}`);
};
