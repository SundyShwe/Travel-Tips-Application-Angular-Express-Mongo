import City from "../models/city.js";
import Activity from "../models/activity.js";

export async function getAllCities(req, res, next) {
  try {
    const results = await City.find();
    res.json({ success: true, data: results });
  }
  catch (err) {
    next(err);
  }
}

export async function getCityByID(req, res, next) {
  try {
    const { city_id } = req.params;
    const result = await City.findById(city_id);
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}

export async function addCity(req, res, next) {
  try {
    const new_city = req.body;
    console.log(new_city);
    const result = await City.create(new_city);
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}

export async function deleteCityByID(req, res, next) {
  try {
    const { city_id } = req.params;
    const result = await City.deleteOne({ _id: city_id });
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}
export async function getActivitesByCity(req, res, next) {
  try {
    const { city_id } = req.params;
    //const result = await Activity.find({ 'city': city_id });
    const result = await Activity.find({ 'city': city_id }).populate('user').populate('city');
    // const result = await Activity.aggregate([
    //   { $match: { 'city': new mongoose.Types.ObjectId(city_id) } },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'user',
    //       foreignField: '_id',
    //       as: 'user_details'
    //     }
    //   }
    // ]);
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err);
  }
}
