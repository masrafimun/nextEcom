import connectDB from "../../../../lib/db";
import User from "../../../../models/userModel"
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    await connectDB()
    const { name, email, password } = await req.json()
    const exists = await User.findOne({ email })
    if (exists) {
      return NextResponse.json({ 
        success: false, 
        message: "User already exists" })
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid email" })
    }

    if (password.length < 8) {
      return NextResponse.json({ 
        success: false, 
        message: "Password should have at least 8 character" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email,password :hashedPassword});
    await user.save();

    console.log(user)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    return NextResponse.json({
      success: true,
      message : 'User created successfully',
      token,
      user: { name: user.name, email: user.email, _id: user._id }
    })
  } catch (err) {
    return NextResponse.json({ 
        success: false, 
        message: err.message })
  }
}
