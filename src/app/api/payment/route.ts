import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Mock Razorpay order creation
    // In production, integrate with actual Razorpay API
    const mockOrder = {
      id: `order_${Date.now()}`,
      amount: amount * 100, // Convert to paise
      currency: "INR",
      created_at: new Date().toISOString(),
      status: "created",
    };

    return NextResponse.json(mockOrder);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
