import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ActivitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    city: { type: Schema.Types.ObjectId, ref: "City", required: true },
    items: [{
      title: String,
      description: String,
      category: String,
      completed: { type: Boolean, default: false }
    }],
    userRatings: {
      ratingCount: { type: Number, default: 0 },
      totalRating: { type: Number, default: 0 }
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Activity", ActivitySchema);