import City from '../models/city.js';
import mongoose from 'mongoose';

export async function addTransportinCity(req, res, next) {
  try {
    const new_transport = req.body;
    console.log(new_transport);
    const { city_id } = req.params;
    const result = await City.updateOne({ _id: city_id },
      {
        $push: { "transports": new_transport }
      })
    res.json({ success: true, data: result });
  }
  catch (err) {
    next(err)
  }
}

export async function getAllTransportsInCity(req, res, next) {
  try {
    const { city_id } = req.params;
    const results = await City.findOne(
      { _id: city_id },
      { transports: 1 }
    );
    res.json({ success: true, data: results });
  }
  catch (err) {
    next(err)
  }
}

export async function addReviewByTransportId(req, res, next) {
  try {
    const new_review = req.body;
    const { city_id, transport_id } = req.params;
    const result = await City.updateOne(
      { '_id': city_id, 'transports._id': transport_id },
      {
        $push: { "transports.$.reviews": { ...new_review, user_id: req.token._id } }
      });
    res.json({ success: true, data: result });

  }
  catch (err) {
    next(err)
  }
}

export async function deleteTransportById(req, res, next) {
  try {
    const { city_id, transport_id, review_id } = req.params;
    const result = await City.updateOne(
      { '_id': city_id, 'transports._id': transport_id },
      {
        $pull: { "transports.$.reviews": { _id: review_id } }
      });
    res.json({ success: true, data: result });

  }
  catch (err) {
    next(err)
  }
}

export async function getTransportById(req, res, next) {
  try {
    const { city_id, transport_id } = req.params;
    const result = await City.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(city_id) } },
      { $unwind: '$transports' },
      { $match: { 'transports._id': new mongoose.Types.ObjectId(transport_id) } },
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: 'transports.reviews.user_id',
      //     foreignField: '_id',
      //     as: 'user_details'
      //   }
      // },
      { $project: { 'transports': 1, _id: 0 } }
    ]);
    // const result = await City.findOne(
    //     { '_id': city_id, 'transports._id': trans_id },
    //     { "transports.reviews": 1 });
    res.json({ success: true, data: result });

  }
  catch (err) {
    next(err)
  }
}