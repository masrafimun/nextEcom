import connectDB from "../../../../lib/db"
import User from "../../../../models/userModel"
import { NextResponse } from "next/server"
//getting cart count
export async function POST(req){
   try{
     await connectDB()
    const {user} = await req.json()
    const userDetails = await User.findById(user)
    const cartItems = userDetails.cartItems
    
    return NextResponse.json({
        success : true,
        cartItems,
    })
   }
   catch(err){
    return NextResponse.json({
        success: false,
        message : err.message
    })
   }
}