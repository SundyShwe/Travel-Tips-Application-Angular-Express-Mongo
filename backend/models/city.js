import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CitySchema = new Schema(
  {
    city_id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    state: { type: String },
    location: [Number],
    transports: [{
      name: { type: String },
      reviews: [{
        type: new mongoose.Schema(
          {
            user_id: mongoose.Types.ObjectId,
            content: String
          },
          { timestamps: true }
        )
      }],
    }]

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("City", CitySchema);