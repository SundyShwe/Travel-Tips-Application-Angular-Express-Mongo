
//No Need anymore, Can delete
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransportSchema = new Schema(
  {
    name: { type: String, required: true },
    city: { name: String, state: String, location: [Number] },
    reviews: [{
      type: new mongoose.Schema(
        { user_id: mongoose.Types.ObjectId, content: String },
        { timestamps: true }
      )
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transport", TransportSchema);