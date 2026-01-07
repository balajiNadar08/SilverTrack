import { Router } from "express";
import {
  getAllMovies,
  getSpecificMovie,
  addMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movies.controller.js";

const moviesRouter = Router();

moviesRouter.get("/", getAllMovies);

moviesRouter.get("/:id", getSpecificMovie);

moviesRouter.post("/", addMovie);

moviesRouter.put("/:id", editMovie);

moviesRouter.delete("/:id", deleteMovie);

export default moviesRouter;
