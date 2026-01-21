import { Router } from "express";
import {
  getAllMovies,
  getSpecificMovie,
  addMovie,
  editMovie,
  deleteMovie,
  searchMoviesController
} from "../controllers/movies.controller.js";
import { createMovieValidator } from "../validators/movie.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const moviesRouter = Router();

moviesRouter.get("/", getAllMovies);

moviesRouter.get("/:id", getSpecificMovie);

moviesRouter.post("/", createMovieValidator, validate, addMovie);

moviesRouter.put("/:id", editMovie);

moviesRouter.delete("/:id", deleteMovie);

moviesRouter.get("/search", searchMoviesController);

export default moviesRouter;
