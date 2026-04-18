import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // STUB: When STRIPE_WEBHOOK_SECRET is set, replace with real webhook handler:
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const sig = req.headers.get("stripe-signature")!;
  // const body = await req.text();
  // const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  //
  // if (event.type === "checkout.session.completed") {
  //   const session = event.data.object;
  //   const { userId, packageId } = session.metadata!;
  //   // Update user's letter credits in Supabase
  //   // Trigger Lob postcard if physical delivery was selected
  // }

  return NextResponse.json({ received: true });
}
