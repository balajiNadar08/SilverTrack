import { Router } from "express";
import {
  getAllMovies,
  getSpecificMovie,
  addMovie,
  editMovie,
  deleteMovie,
  searchMoviesController,
} from "../controllers/movies.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import createMovieValidator from "../validators/movie.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const moviesRouter = Router();

moviesRouter.get("/", authMiddleware, getAllMovies);

moviesRouter.get("/search", searchMoviesController);

moviesRouter.get("/:id", authMiddleware, getSpecificMovie);

moviesRouter.post(
  "/",
  authMiddleware,
  createMovieValidator,
  validate,
  addMovie,
);

moviesRouter.put("/:id", authMiddleware, editMovie);

moviesRouter.delete("/:id", authMiddleware, deleteMovie);

export default moviesRouter;
