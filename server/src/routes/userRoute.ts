import express from "express";
import passport from "passport";
import { auth } from "../middleware/middleware";
import { getTeam, globalAuth, registerTeam, submitIdea } from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/signin", passport.authenticate("google", { scope: ['profile', 'email'] }));
userRouter.get("/google/callback", passport.authenticate("google", {
  successRedirect: "https://hack-fusion25.vercel.app",
  failureRedirect: "https://hack-fusion25.vercel.app/error"
}))

//@ts-ignore
userRouter.post("/register",auth,registerTeam);
userRouter.post("/submit",auth,submitIdea);
userRouter.get("/getteam",auth,getTeam);
userRouter.get("/isauth",globalAuth);

