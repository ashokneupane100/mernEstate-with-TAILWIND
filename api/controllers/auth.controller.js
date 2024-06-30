import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
    console.log(error.message);
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(new Error("Unauthorized: User not found."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(new Error("Unauthorized: Wrong credentials."));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d', // Set an expiration time for the token
    });

    const{password:pass, ...rest}=validUser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true, // HTTPS-only cookie
        sameSite: 'strict', // Prevent cross-site request forgery
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

