import User from "../models/user.js";
import bcrypt from "bcrypt";

export async function getAllUsers(req, res, next) {
  try {
    const results = await User.find();
    res.json({ success: true, data: results });
  }
  catch (err) {
    next(err);
  }
}

export async function getUserByID(req, res, next) {
  try {
    const { user_id } = req.params;
    const result = await User.findById(user_id);
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}

export async function addBadegesToUser(req, res, next) { // for badge
  try {
    const { user_id } = req.params;
    const new_badge = req.params;
    const result = await User.updateOne({ _id: user_id },
      { $push: { 'badges': new_badge } });
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}

export async function deleteUserByID(req, res, next) {
  try {
    const { city_id } = req.params;
    const result = await User.deleteOne({ _id: city_id });
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { user_id } = req.params;
    const { password: plain_password } = req.body;
    const hashed_password = await bcrypt.hash(plain_password, 10);

    const result = await User.updateOne({ _id: user_id },
      { password: hashed_password });
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}


