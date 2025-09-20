import Stripe from "stripe";
import { userModel } from "../model/userModel";
import { paymentModel } from "../model/paymentsModel";
import { connectToDatabase } from "./mongodb";


export async function handleSessionCompleted({session,stripe}:{session: Stripe.Checkout.Session, stripe:Stripe}){

    console.log("checkout session completed");
    const customerid= session.customer as string;
    const customer = await stripe.customers.retrieve(customerid);
    const priceid = session.line_items?.data[0]?.price?.id;

    if ('email' in customer && priceid) {
        const {email,name}= customer;

        await createOrUpdateUser({
            email: email as string,
            fullname: name as string,
            customerid,
            priceid: priceid as string,
            status: "active"

        })

        await createPayment({
            session: session.id as string,
            priceid: priceid as string,
            email: email as string,
            customerid: customerid
        })
    }
    
}

export async function createOrUpdateUser({email,fullname, customerid,priceid,status}:{
      email:  string;
            fullname:  string,
            customerid: string,
            priceid: string,
            status: "active"
}) {

    await connectToDatabase();

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        existingUser.fullname = fullname;
        existingUser.customerid = customerid;
        existingUser.priceid = priceid;
        existingUser.status = status;
        await existingUser.save();
    } else {
        const newUser = new userModel({
            email,
            fullname,
            customerid,
            priceid,
            status
        });
        await newUser.save();
    }
}
export async function createPayment({email,session,priceid,customerid}:{
      email:  string;
            session: string;
            priceid: string,
            customerid: string
}) {

    await connectToDatabase();

    const newPayment = new paymentModel({
        session,
        email,
        priceid,
        customerid
    });

    await newPayment.save();
}

