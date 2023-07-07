import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    badges: [{
      type: new mongoose.Schema(
        { name: String },
        { timestamps: true }
      )
    }],
    totalActivities: { type: Number, default: 0 }
  },
  {
    timestamps: true,
  }
);

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.firstName && this.lastName) {
    fullname = `${this.lastName}, ${this.firstName}`;
  }
  if (!this.firstName || !this.lastName) {
    fullname = "";
  }
  return fullname;
});

export default mongoose.model("User", UserSchema);