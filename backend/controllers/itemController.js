import Activity from "../models/activity.js";

export async function getAllItemInList(req, res, next) {
  try {
    const user_id = req.token._id;
    const { a_id } = req.params;
    const result = await Activity.findOne(
      { _id: a_id, 'user_id': user_id },
      { 'items': 1 });
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}
export async function getItemById(req, res, next) {
  try {
    const user_id = req.token._id;
    const { a_id, item_id } = req.params;
    const result = await Activity.findOne(
      { _id: a_id, 'user_id': user_id, 'items._id': item_id },
      { 'items.$': 1 }
    );
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}
export async function addItemToList(req, res, next) {
  try {
    const user_id = req.token._id;
    const { a_id } = req.params;
    const new_item = req.body;
    const result = await Activity.updateOne(
      { '_id': a_id, 'user_id': user_id },
      {
        $push: { "items": new_item }
      });
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}
export async function completeItembyId(req, res, next) {
  try {
    const { a_id, item_id } = req.params;
    const result = await Activity.updateOne(
      { _id: a_id, 'user_id': user_id, 'items._id': item_id },
      { 'items.$.completed': true }
    );
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}
export async function deleteItemById(req, res, next) {
  try {
    const user_id = req.token._id;
    const { a_id, item_id } = req.params;
    const result = await Activity.updateOne(
      { '_id': a_id, 'user_id': user_id },
      {
        $pull: { 'items': { _id: item_id } }
      });
    res.json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
}