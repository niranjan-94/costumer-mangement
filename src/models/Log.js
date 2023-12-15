import mongoose from "mongoose";

const { Schema } = mongoose;

const logSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    action:{
        type: String,
        required: true,
    }
   
  },
  { timestamps: true }
);

export default mongoose.models.log || mongoose.model("log", logSchema);