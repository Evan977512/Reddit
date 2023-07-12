import { Request, Router, Response } from "express";
import { User } from "../entities/User";
import { isEmpty, validate } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};

    // check if email and username is already taken
    const emailUser = await User.findOneBy({ email });
    const usernameUser = await User.findOneBy({ username });

    // if email is already taken errors object will be populated
    if (emailUser) errors.email = "Email is already taken";
    if (usernameUser) errors.username = "Username is already taken";

    // if there are any errors send them Response
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // create the user instance
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // validate the user instance
    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapError(errors));

    // save user information to the user table
    await user.save();

    // return the user information to response
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    let errors: any = {};

    // if empty username or password return error
    if (isEmpty(username)) errors.username = "Username must not be empty";
    if (isEmpty(password)) errors.password = "Password must not be empty";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // find the user in the database
    const user = await User.findOneBy({ username });

    // if user is not found return error
    if (!user) return res.status(404).json({ username: "User not found" });

    // if user exists, check the password
    const passwordMatches = await bcrypt.compare(password, user.password);

    // if password does not match return error
    if (!passwordMatches) {
      return res.status(401).json({ password: "Password is incorrect" });
    }

    // if password is correct generate token
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // save token in cookie
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 90,
        path: "/",
      })
    );

    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const router = Router();
router.post("/register", register);
router.post("/login", login);

export default router;
