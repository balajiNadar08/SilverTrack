import { body } from "express-validator";

const createMovieValidator = [
  body("tmdbMovieId")
    .notEmpty()
    .withMessage("tmdbMovieId is required"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be between 0 to 10"),

  body("status")
    .optional()
    .isIn(["planned", "watching", "completed"])
    .withMessage("Invalid status"),
];

export default createMovieValidator;