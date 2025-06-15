import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/userModel";

//add to cart
export async function POST(req){
    try{
        await connectDB()
        const {itemId,user} =await req.json()
        const userDetails =await User.findById(user)
        let cartItems = userDetails.cartItems
        if(cartItems[itemId]){
            cartItems[itemId] +=1
        }
        else{
            cartItems[itemId]=1
        }
        const newUser = await User.findByIdAndUpdate(user,{cartItems},{ new: true, runValidators: true })
        
        return NextResponse.json({
            success : true,
            message : "added to the card successfully"
        })
    }
    catch(err){
        console.log(err.message)
        return NextResponse.json({
            success:false,
            message : err.message
        })
    }
}
