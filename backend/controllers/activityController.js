import Activity from "../models/activity.js";
import User from "../models/user.js";

export async function getAllActivities(req, res, next) {
  try {
    const user_id = req.token._id;
    const result = await Activity.find({ 'user': user_id }).sort({ updatedAt: -1 }).populate('user').populate('city');
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}

export async function addActivity(req, res, next) {
  try {
    const user_id = req.token._id;
    const new_activity = req.body;
    const result = await Activity.create({ ...new_activity, 'user': user_id });

    const itemTotal = typeof req.body.items === "undefined" ? [] : req.body.items.length;
    const user = await User.findOneAndUpdate({ _id: user_id }, { $inc: { 'totalActivities': itemTotal } });
    var modifiedResult = result.toObject();
    modifiedResult.totalActivities = user.totalActivities;
    res.json({ success: true, data: modifiedResult });
  } catch (err) {
    next(err);
  }
}

export async function getActivityById(req, res, next) {
  try {
    const user_id = req.token._id;
    const { activity_id } = req.params;
    const result = await Activity.findOne({ _id: activity_id, user: user_id });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function updateActivityById(req, res, next) {
  try {
    const { activity_id } = req.params;
    const { title, description, completed } = req.body;
    const result = await Todo.updateOne(
      { _id: activity_id, user_id: user_id },
      { $set: { title, description, completed } }
    );
    res.json({ success: true, data: result });
  } catch (error) {

  }
}

export async function deleteActivityById(req, res, next) {
  try {
    const user_id = req.token._id;
    const { activity_id } = req.params;
    const activity = await Activity.findById(activity_id);
    const user = await User.findOneAndUpdate({ _id: user_id }, { $inc: { 'totalActivities': -activity.items.length } })
    const result = await Activity.deleteOne({ _id: activity_id, 'user': user_id });
    result.totalActivities = user.totalActivities;
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}