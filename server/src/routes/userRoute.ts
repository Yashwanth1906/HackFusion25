import express from "express";
import passport from "passport";
import { auth } from "../middleware/middleware";
import { registerTeam } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/signin", passport.authenticate("google", { scope: ['profile', 'email'] }));
userRouter.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/",
  failureRedirect: "http://localhost:3000/failed"
}))

//@ts-ignore
userRouter.post("/register", auth, registerTeam);

