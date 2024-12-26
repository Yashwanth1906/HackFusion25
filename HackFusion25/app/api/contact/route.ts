
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Named export for the POST method
export async function POST(req:Request) {
  const { name, email, phone, message } =await req.json() ;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hackerz1cit@gmail.com", // Replace with your email
      pass: "wppj dxmk kpig efle",   // Replace with your email password or app-specific password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "hackerz1cit@gmail.com", // The recipient's email address
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
