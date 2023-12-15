import mongoose from "mongoose";

const { Schema } = mongoose;

const statusSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Status || mongoose.model("Status", statusSchema);
