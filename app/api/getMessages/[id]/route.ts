import { IMessage } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const id = Number(request.url.split("/")[5]);

  let response: IMessage[] = [];

  if (id === 3) {
    response = [
      {
        id: 0,
        message:
          "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
        date: "19:32",
        isMine: false,
        sender: "FastVisa Support",
      },
      {
        id: 1,
        message: "Hi, I need help with something can you help me ?",
        date: "19:32",
        isMine: true,
        sender: "You",
      },
    ];
  }

  return NextResponse.json(response, { status: 200 });
}
