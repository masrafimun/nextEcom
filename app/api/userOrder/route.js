import User from "../../../models/userModel"
import orderModel from "../../../models/orderModel"
import connectDB from "../../../lib/db"
import { NextResponse } from "next/server"
export async function POST(req){
    try{
        await connectDB()
        const {user} =await req.json()
        let userId = user
        const orders = await orderModel.find({userId})
        return NextResponse.json({
            success : true,
            orders
        })
    }
    catch(err){
        return NextResponse.json({
            success : false,
            message : err.message
        })
    }
}
