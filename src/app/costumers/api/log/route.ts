import Log from "@/models/Log";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const req = await request.json();

  const newLog = new Log(req);

  try {
    await connect();
    await newLog.save();
    return new NextResponse("Log is created", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
