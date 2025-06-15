import User from "../../../../models/userModel"
import connectDB from "../../../../lib/db"
import { NextResponse } from "next/server"

export async function  POST(req){
    try{
        connectDB()
        const {itemId,user,newQuantity} =await req.json()
        const userDetails =await User.findById(user)
        let cartItems = userDetails.cartItems

        cartItems[itemId] = newQuantity 

        await User.findByIdAndUpdate(user,{cartItems})

        return  NextResponse.json({
            success : true,
            message : 'Cart Updated'
        })
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : err.message
        })
    }
}