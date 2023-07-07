import User from "../models/user.js";

export async function addBadge(req, res, next) {
  try {
    const new_badge = req.body;
    const { user_id } = req.params;

    const result = await User.updateOne({ _id: user_id },
      {
        $push: { "badges": new_badge }
      })
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err)
  }
}

export async function getAllBadges(req, res, next) {
  try {
    const { user_id } = req.params;
    const results = await User.find(
      { _id: user_id },
      { badges: 1 }
    );
    res.json({ success: true, data: results });
  }
  catch (err) {
    next(err)
  }
}
