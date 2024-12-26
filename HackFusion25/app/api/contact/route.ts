
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req:Request) {
  const { name, email, phone, message } =await req.json() ;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass:process.env.EMAIL_PASS,   
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "hackerz1cit@gmail.com", 
      replyTo: email,
  
      subject: `New Message from ${name}`,
      text: `You have received a new message:\n\n
      Name: ${name}
      Email: ${email}, 
      Phone: ${phone},
      
      Message:
      ${message}`
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" });
  }
}
