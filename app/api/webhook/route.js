import { initMongoose } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { buffer } from "micro";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        await initMongoose();

        console.log("webhook route");

        const signingSecret = "whsec_9134d0b2ffe24826ccffd7c99c00225405e9251e76e0c639208da8ef5a42bbbe";
        // const signingSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

        // Read the request body as a buffer
        const payloadBuffer = await req.arrayBuffer();
        const payload = Buffer.from(payloadBuffer);

        // Get the Stripe signature from the headers
        const signature = req.headers.get('stripe-signature');

        // Construct the Stripe event
        const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);

        if (event.type === "checkout.session.completed") {
            console.log("Event:", event);
        } else {
            console.log("Not completed");
        }

        console.log("webhook route");

        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function GET() {
    console.log("HI welcome");
    return NextResponse.json({ message: "HI welcome" });
}
