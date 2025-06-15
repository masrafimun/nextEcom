
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
   
    if (!user) {
      return NextResponse.json({ 
        success: false,
        message: "User does not exist" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return NextResponse.json({ 
        success: false, 
        message: "Incorrect password" 
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json({
      success: true,
      message : 'Login successful',
      token,
      user: { name: user.name, email: user.email, _id: user._id }
    });
  } catch (err) {

    return NextResponse.json({ success: false, message: err.message });
  }
}
