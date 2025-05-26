import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const companyEmail = process.env.COMPANY_EMAIL;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'; // Default if not set

export async function POST(request: NextRequest) {
  if (!companyEmail) {
    console.error('COMPANY_EMAIL is not defined in environment variables.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not defined in environment variables.');
    return NextResponse.json({ error: 'Server configuration error for email.' }, { status: 500 });
  }

  try {
    // Parse the request body
    const body = await request.json();
    const {
      from: customerEmail, // Email from the form (customer's email)
      subject,
      text, // Plain text content from your checkout form
      // You can also add an `html` field here if you want to send HTML emails
    } = body;

    if (!customerEmail || !subject || !text) {
      return NextResponse.json({ error: 'Missing required email fields: from, subject, or text.' }, { status: 400 });
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail, // The email address you're sending from (verified with Resend)
      to: [companyEmail], // Your company's email address to receive the notification
      reply_to: customerEmail, // Optional: Set the customer's email as reply-to
      subject: subject,
      text: text, // Plain text version of the email
      // html: `<div>${text.replace(/\n/g, '<br>')}</div>` // Basic HTML version (optional)
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: 'Failed to send email.', details: error }, { status: 500 });
    }

    // Successfully sent email
    return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });

  } catch (err: any) {
    console.error('Error processing email request:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: err.message }, { status: 500 });
  }
}