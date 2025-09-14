import { model, Schema, models } from "mongoose";

export interface Ipayments extends Document {
   session:string;
        priceid:  string;
        email:  string;
        customerid:String
            
}

const PaymentSchema = new Schema<Ipayments>({
    session:  {type: String, required:true},
    email:   {type: String, required:true},
    customerid:   {type: String, required:true},
    priceid:   {type: String, required:true},
},{
    timestamps:true
})

// Check if the model already exists to prevent recompilation errors
export const paymentModel = models.Payment || model<Ipayments>("Payment", PaymentSchema);
