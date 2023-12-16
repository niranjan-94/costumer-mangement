import Costumer from "@/models/Costumer";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  const req = await request.json();

  const existingCostumer = await Costumer.findOne({ email:req?.email });
  if (existingCostumer) {
    return new NextResponse("Email is already in use", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(req?.password, 5);
  const newCostumer = new Costumer({
    ...req,
    password: hashedPassword,
  });

  try {
    await newCostumer.save();
    return new NextResponse("Costumer is created", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err?._message, {
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    await connect()
    const costumers =  await Costumer.find()
    return new NextResponse(JSON.stringify(costumers), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};