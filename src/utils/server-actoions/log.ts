"use server"

import User from "@/models/User";
import connect from "../db";
import Log from "@/models/Log";
import { ObjectId } from "mongodb"; 

export const userLog = async (email: string, action: "login" | "logout") => {
  await connect();
  try {
    const user = await User.findOne({ email });
    if (user) {
      const userId = new ObjectId(user._id); // Ensure user._id is a valid ObjectId

      const newLog = new Log({ userId, action });
      await newLog.save();
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

