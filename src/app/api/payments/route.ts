import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, userId, email } = body;

    if (!planId || !userId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Plan pricing (in INR)
    const plans: Record<string, { amount: number; name: string }> = {
      free: { amount: 0, name: "Free Plan" },
      trial: { amount: 30, name: "Trial Pass" },
      pathfinder: { amount: 599, name: "Pathfinder Plan" },
      navigator: { amount: 799, name: "Navigator Plan" },
    };

    const plan = plans[planId];
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (plan.amount === 0) {
      return NextResponse.json({
        success: true,
        message: "Free plan activated",
      });
    }

    // UPI payment details
    const upiId = "aayanc@fam";
    const merchantName = "Opportunity OS";

    // In production with Razorpay:
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const order = await razorpay.orders.create({
    //   amount: plan.amount * 100,
    //   currency: "INR",
    //   receipt: `receipt_${userId}_${Date.now()}`,
    // });

    return NextResponse.json({
      success: true,
      orderId: `order_${Date.now()}`,
      amount: plan.amount,
      currency: "INR",
      planName: plan.name,
      upiId: upiId,
      merchantName: merchantName,
      // For Razorpay integration:
      key: process.env.RAZORPAY_KEY_ID || "rzp_test_demo",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
