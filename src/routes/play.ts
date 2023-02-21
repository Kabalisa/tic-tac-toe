import express from "express";
import PlayController from "../controllers/play.controller";

const router = express.Router();

router.get("/play", PlayController.play);

export { router as playRouter };
