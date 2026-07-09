import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      error:
        "Adaptive testing is deprecated. Use static linear tryouts instead.",
    },
    { status: 400 },
  );
}
