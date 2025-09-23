import { handleSessionCompleted } from "@/lib/payments";
import { NextResponse,NextRequest } from "next/server";
import Stripe from "stripe"

export const POST= async(req: NextRequest)=>{
  // Initialize Stripe inside the function to ensure env vars are available
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    console.error("STRIPE_SECRET_KEY environment variable is not set");
    return NextResponse.json({error: "Server configuration error"}, {status: 500});
  }

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET environment variable is not set");
    return NextResponse.json({error: "Server configuration error"}, {status: 500});
  }

  const stripe = new Stripe(stripeSecretKey);

      console.log("webhook started")

    const payload= await req.text()
    const signature = req.headers.get('stripe-signature');


    console.log("webhook called")

    let event;

    try {
         event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        webhookSecret,
      );
        
    }
     catch (error) {
        return NextResponse.json({error:"invalid signature",message: error},{status:400})
        
    }
    

    try {
      switch (event.type) {
    case 'checkout.session.completed':
      const sessionid= event.data.object.id
      const session = await stripe.checkout.sessions.retrieve(sessionid,{expand:['line-items']})
      console.log("session successful");
      console.log(session);
        await handleSessionCompleted({session, stripe})

      break;
       
    case 'customer.subscription.deleted':
      const subscription= event.data.object as Stripe.Subscription;
      console.log("subscription deleted");
      console.log(subscription);

     // await handleSessionDeleted({session})
      break;
      } }
    catch (error) {
      console.log(error)
    }

        return NextResponse.json({status:"success" ,message: "hi from stripe api"})

}


