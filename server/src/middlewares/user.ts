import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

// get cookie token from request
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check if the user is available is able to create sub
    const token = req.cookies.token;
    if (!token) return next();

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneBy({ username });

    // if not, throw error!
    if (!user) throw new Error("Unauthenticated");

    // place user information to 'res.local.user'
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong!!!! WHY!!????" });
  }
};

// decode token using 'verify' method and 'jwt secret'

// get user from database using username from decoded token
