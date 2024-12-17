import { prisma } from "../db";

export const auth = async (req: any, res: any, next: any) => {
  console.log(req.user)
  try {
    if (req.isAuthenticated()) {
      console.log("Users: ", req.user);
      next();
    } else {
      res.json({ authenticated: false, user: null })
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
}
