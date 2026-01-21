import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, validate, registerUser);

authRouter.post("/login", loginValidator, validate, loginUser);

authRouter.post("/logout", logoutUser);

export default authRouter;
