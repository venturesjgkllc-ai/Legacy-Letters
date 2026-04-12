import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, userId } = body;

    // STUB: When STRIPE_SECRET_KEY is set, replace with real Stripe Checkout:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   line_items: [{ price: PACKAGE_PRICE_IDS[packageId], quantity: 1 }],
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    //   metadata: { userId, packageId },
    // });
    // return NextResponse.json({ url: session.url });

    // Mock redirect to dashboard
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true&pkg=${packageId}`,
    });
  } catch (err) {
    console.error("[/api/checkout]", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
