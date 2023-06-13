import client from "@/lib/appwrite.server";
import { NextRequest, NextResponse } from "next/server";
import { Users } from "node-appwrite";

const users = new Users(client);

export async function GET(request: NextRequest) {
  const user_id = request.nextUrl.searchParams.get("user_id") ?? "null";

  let json_response = {};

  try {
    const user = await users.get(user_id);
    json_response = { status: "success", data: user, message: "User found" };
    return NextResponse.json(json_response);
  } catch (error: any) {
    json_response = { status: "error", message: error.message };
  }
  return NextResponse.json(json_response);
}
