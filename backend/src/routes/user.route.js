import { Router } from "express";
import {
  getMyProfile,
  editMyProfile,
  deleteMyProfile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getMyProfile);

userRouter.put("/me", authMiddleware, editMyProfile);

userRouter.delete("/me", authMiddleware, deleteMyProfile);

export default userRouter;
