import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, userId, email } = body;

    // Validate input
    if (!planId || !userId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Plan pricing (in INR)
    const plans: Record<string, { amount: number; name: string }> = {
      free: { amount: 0, name: "Free Plan" },
      starter: { amount: 99, name: "Starter Plan" },
      pro: { amount: 199, name: "Pro Plan" },
      annual: { amount: 999, name: "Annual Plan" },
    };

    const plan = plans[planId];
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    if (plan.amount === 0) {
      return NextResponse.json({
        success: true,
        message: "Free plan activated",
      });
    }

    // In production, this would:
    // 1. Create a Razorpay order
    // 2. Return order_id to the frontend
    // 3. Frontend completes payment
    // 4. Webhook verifies and activates subscription

    // Razorpay order creation would look like:
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const order = await razorpay.orders.create({
    //   amount: plan.amount * 100, // amount in paise
    //   currency: "INR",
    //   receipt: `receipt_${userId}_${Date.now()}`,
    // });

    return NextResponse.json({
      success: true,
      orderId: `order_demo_${Date.now()}`,
      amount: plan.amount,
      currency: "INR",
      planName: plan.name,
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_demo",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
