import { Request, Router, Response } from "express";
import { User } from "../entities/User";
import { validate } from "class-validator";

const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints[0][1]);
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

const router = Router();
router.post("/register", register);

export default router;
