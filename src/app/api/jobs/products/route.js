import connectMongoDB from "@/libs/mongodb";
import Job from "@/models/job";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { title, description, datetime } = await request.json();
  await connectMongoDB();
  await Job.create({ title, description, datetime });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}
