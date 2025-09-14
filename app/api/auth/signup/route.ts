
import connectToDatabase from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  connectToDatabase()
  try {
    const {fullname, password,email}= await request.json()

    const emailExists = await userModel.findOne({email})
    if (emailExists) {
       return Response.json({success:false, message: 'user already exists' },{ status: 400})
    } else {
        const hashedPassword= await bcrypt.hash(password,10)
        
        const user = new userModel({
            fullname,
            customerid:"",
            priceid:"",
               email,
               password: hashedPassword,
        })

        await user.save()


        return Response.json({success:true, message: 'user created' },{ status: 200})
    }
  } catch (error) {
    console.log(error)
    return Response.json({success:false, message: 'Internal Server Error'}, {status: 500})
  }
}
