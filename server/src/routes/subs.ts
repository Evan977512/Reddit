import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";

const createSub = async (req: Request, res: Response, next) => {
  const { name, title, description } = req.body;

  // // check if the user is available is able to create sub
  // const token = req.cookies.token;
  // if (!token) return next();

  // const { username }: any = jwt.verify(token, process.env.JWT_SECRET);
  // const user = await User.findOneBy({ username });

  // // if not, throw error!
  // if (!user) throw new Error("Unauthenticated");

  // if yes, check if the sub's name and title are available

  // create Sub Instance and save it to the database

  // return the sub instance to the client
};

const router = Router();

router.post("/", createSub);

export default router;
