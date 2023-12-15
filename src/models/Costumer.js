import mongoose from "mongoose";

const { Schema } = mongoose;

const costumerSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    age: {
      type: String,
      required: false,
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Costumer ||
  mongoose.model("Costumer", costumerSchema);
