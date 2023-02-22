import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { isValidBoard, fetchWinner, isTie, nextMove } from "../utils/common";

class PlayController {
  static async play(req: Request, res: Response) {
    let { board } = req.query;

    if (!board) {
      throw new BadRequestError("the board can not be empty");
    }

    if (board.length !== 9) {
      throw new BadRequestError("the boards length should be eqaul to 9");
    }

    if (!isValidBoard(board)) {
      throw new BadRequestError(
        "invalid board. the board should be composed of only x, o, or space"
      );
    }

    let winner = fetchWinner(board.toString());
    let tie = isTie(board.toString());
    if (!winner && !tie) {
      board = nextMove(board.toString());
      winner = fetchWinner(board.toString());
      tie = isTie(board.toString());
    }

    return res.send({
      board: board.toString().replaceAll(" ", "+"),
      winner,
      tie,
    });
  }
}

export default PlayController;
