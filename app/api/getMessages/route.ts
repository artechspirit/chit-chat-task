import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: 0,
      title: "109220-Naturalization",
      name: "Cameron Phillips",
      date: "January 1,2021 19:10",
      isGroup: true,
      message: "Hey, check this out!",
    },
    {
      id: 1,
      title:
        "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      name: "Ellen",
      date: "02/06/2021 10:45",
      isGroup: true,
      message: "Hey, Please read!",
    },
    {
      id: 2,
      title: "8405-Diana SALAZAR MUNGUIA",
      name: "Cameron Phillips",
      date: "01/06/2021 12:19",
      isGroup: true,
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
    },
    {
      id: 3,
      title: "FastVisa Support",
      name: "",
      date: "01/06/2021 12:19",
      isGroup: false,
      message: "Hey there! Welcome to your inbox.",
    },
  ];

  return NextResponse.json(data, { status: 200 });
}
