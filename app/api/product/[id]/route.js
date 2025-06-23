import { NextResponse } from "next/server";
import productModel from "../../../../models/productModel";
import connectDB from "../../../../lib/db";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await productModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" }   );
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message } );
  }
}
