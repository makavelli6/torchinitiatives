import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handles POST requests to /api
const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME; // Your Gmail username
const password = process.env.NEXT_EMAIL_PASSWORD; // Your Gmail password
const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL; // Your personal email

export async function POST(request: Request) {
    // Get body of request
    const formData = await request.json();
    const { name, email, message } = formData;

    // Create transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
            pass: process.env.NEXT_EMAIL_PASSWORD
        }
    });
    

    try {
        const mail = await transporter.sendMail({
            from: email,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {font-family: Arial, Helvetica, sans-serif;}
                    .container {padding: 20px;}
                    .header {background-color: #f8f8f8; padding: 10px; text-align: center;}
                    .content {margin-top: 20px;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Website Activity</h2>
                    </div>
                    <div class="content">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong> ${message}</p>
                    </div>
                </div>
            </body>
            </html>
            `,
        });

        return NextResponse.json({ message: "Success: email was sent" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
    }
}
