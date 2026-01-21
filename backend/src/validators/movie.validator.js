import { body } from "express-validator";

export const createMovieValidator = [
  body("title")
    .notEmpty().withMessage("Movie title is required"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be between 0 and 10"),

  body("watched")
    .optional()
    .isBoolean()
    .withMessage("Watched must be true or false"),
];
