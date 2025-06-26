import { NextResponse } from "next/server"
import orderModel from "../../../models/orderModel"
import User from "../../../models/userModel"
import connectDB from "../../../lib/db"
export async function POST(req){
     try{
        await connectDB()
        const {userId,items,amount,address} =await req.json()


        if(!userId){
        return NextResponse.json({
           success: false,
           message : "Please Login"
          })
        }

        if(items.length===0){
           return NextResponse.json({
           success: false,
           message : "Please select an Item"
          })
        }

        const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod : "COD",
        payment : false,
        date : Date.now()
    }

    //creating new order data
    const newOrder = new orderModel(orderData)
    //saving new order data
    await newOrder.save()

    // clearing the cartdata after placinfg order
    await User.findByIdAndUpdate(userId,{cartItems :{}})
    return NextResponse.json({
        success: true,
        message : "order placed successfully"
    })

  }  
  catch(err){
    return NextResponse.json({
        success: false,
        message : err.message
    })
  }
}
