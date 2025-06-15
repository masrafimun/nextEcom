//function for list product
import { NextResponse } from "next/server"
import productModel from "../../../models/productModel"
import connectDB from "../../../lib/db"
export async function GET(req) {
    try{
        await connectDB()
        const products = await productModel.find({})
           return NextResponse.json({
            success : true,
            products
        })
    }
    catch(err){
           return NextResponse.json({
            success : false,
            message : err.message
        })
    }
}