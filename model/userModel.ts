import { model, Schema, models } from "mongoose";

export interface IUser extends Document {
 email:  String;
            fullname:  String,
            customerid: String,
            priceid: String,
            status: string,
            password: String;
            
}

const UserSchema = new Schema<IUser>({
    fullname:  {type: String, required:true},
    email:   {type: String, required:true},
    customerid:   {type: String, },
    priceid:   {type: String},
    status: {type: String, required:true, default:"inactive"},
    password: { type: String, required: true }
},{
    timestamps:true
})

// Check if the model already exists to prevent recompilation errors
export const userModel = models.User || model<IUser>("User", UserSchema);



