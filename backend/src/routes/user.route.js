import { Router } from "express";
import {
  getMyProfile,
  editMyProfile,
  deleteMyProfile,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/me", getMyProfile);

userRouter.put("/me", editMyProfile);

userRouter.delete("/me", deleteMyProfile);

export default userRouter;
