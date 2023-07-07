import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function signup(req, res, next) {
  try {
    const new_user = req.body;
    const { password: plain_password } = new_user;
    const hashed_password = await bcrypt.hash(plain_password, 10);
    const result = await User.create({
      ...new_user,
      password: hashed_password
    });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      const pswCheck = await bcrypt.compare(password, user.password);
      if (pswCheck) {
        const JWT_TOKEN = jwt.sign({
          ...user,
          password: ''
        }, process.env.SECRET_KEY);
        res.json({ success: true, data: JWT_TOKEN });
      }
      else {
        next(new Error('Invalid password.'))
      }

    } else {
      next(new Error('There is no user with this email.'))
    }

  } catch (error) {
    next(error);
  }
}

