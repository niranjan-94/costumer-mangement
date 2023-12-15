import Costumer from "@/models/Costumer";
import Status from "@/models/Status";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export async function GET(request:any, { params }:any) {
    const { id } = params;
    await connect();
    const costumer = await Costumer.findOne({ _id: id });
    return NextResponse.json({ costumer }, { status: 200 });
  }

  export async function PUT(request:any, { params }:any) {
    const { id } = params;
    const data = await request.json();
    await connect();
    await Costumer.findByIdAndUpdate(id, data);
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
  }

  export const DELETE = async (request: any, { params }: any) => {
    const { id } = params;
    try {
      await connect();
      await Costumer.findByIdAndDelete(id);
      return new NextResponse("Costumer deleted", { status: 200 });
    } catch (err: any) {
      return new NextResponse(err, {
        status: 500,
      });
    }
  };

  export const POST = async (request: any, { params }: any) => {
    const { id } = params;
    const {status} = await request.json();

    const newStatus = new Status({
      userId: id,
      status,
    });

    try {
      await connect();
      await newStatus.save();
      const data = await Costumer.findById(id).exec();
      const existingCustomer = await Costumer.findById(id).exec();
      console.log("Existing Customer:", existingCustomer);
      data.status = status

      await Costumer.findByIdAndUpdate(id, { $set: data } );
      return new NextResponse("Costumer status changed", { status: 200 });
    } catch (err: any) {
      return new NextResponse(err, {
        status: 500,
      });
    }
  };