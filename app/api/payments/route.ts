import { handleSessionCompleted } from "@/lib/payments";
import { NextResponse,NextRequest } from "next/server";
import Stripe from "stripe"

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY!) //thsi syntax should be exact same 

export const POST= async(req: NextRequest)=>{

      console.log("webhook started")

    const payload= await req.text()
    const signature = req.headers.get('stripe-signature');
    const endpoint= process.env.STRIPE_WEBHOOK_SECRET!


    console.log("webhook called")

    let event;

    try {
         event = stripe.webhooks.constructEvent(
        payload,
        signature!,
        endpoint,
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


