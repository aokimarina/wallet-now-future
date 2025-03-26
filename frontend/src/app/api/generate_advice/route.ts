import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const {
      current_balance,
      target_amount,
      remaining_period,
      savings_this_month,
    } = await req.json();

    console.log("Received data:", {
      current_balance,
      target_amount,
      remaining_period,
      savings_this_month,
    });

    // FlaskバックエンドAPIへのリクエスト
    const response = await axios.post("http://localhost:5000/generate_advice", {
      current_balance,
      target_amount,
      remaining_period,
      savings_this_month,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error during API request:", error);

    return NextResponse.json(
      {
        error: "アドバイス生成に失敗しました",
        details: (error as any).message,
      },
      { status: 500 }
    );
  }
}
