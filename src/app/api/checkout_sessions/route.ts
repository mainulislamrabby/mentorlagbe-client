import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      mode: "subscription",

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/payment/cancel`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const error = err as {
      message?: string;
      statusCode?: number;
    };

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: error.statusCode || 500,
      },
    );
  }
}