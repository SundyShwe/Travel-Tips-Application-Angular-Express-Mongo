import Activity from "../models/activity.js";

export async function getRatings(req, res, next) {
  try {
    //const user_id = req.token._id;
    const { activity_id } = req.params;
    const result = await Activity.findOne(
      { _id: activity_id },
      { 'userRatings': 1 });
    //console.log(result);
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}
export async function addRatings(req, res, next) {
  try {
    // const user_id = req.token._id;
    const { activity_id } = req.params;
    const { new_rating } = req.body;
    await Activity.updateOne(
      { _id: activity_id },
      { $inc: { "userRatings.ratingCount": 1, 'userRatings.totalRating': new_rating } }
    );

    const result = await Activity.findOne(
      { _id: activity_id },
      { 'userRatings': 1 });

    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}
