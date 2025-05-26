import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const companyEmail = process.env.COMPANY_EMAIL;
// Use the same logic for fromEmail as in your checkout API:
// It will use your verified domain if RESEND_FROM_EMAIL is set,
// or default to 'onboarding@resend.dev' if it's not.
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

export async function POST(request: NextRequest) {
  if (!companyEmail) {
    console.error('COMPANY_EMAIL is not defined in environment variables.');
    return NextResponse.json({ error: 'Server configuration error: Company email missing.' }, { status: 500 });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not defined in environment variables.');
    return NextResponse.json({ error: 'Server configuration error: Resend API key missing.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { firstName, lastName, email: senderEmail, message } = body;

    if (!firstName || !lastName || !senderEmail || !message) {
      return NextResponse.json({ error: 'Missing required fields in request.' }, { status: 400 });
    }

    const emailSubject = `Nova kontakt poruka od: ${firstName} ${lastName}`;
    const emailText = `
      Dobili ste novu poruku putem kontakt forme:

      Ime: ${firstName}
      Prezime: ${lastName}
      Email: ${senderEmail}
      Poruka:
      ${message}
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,       // Sender address (your verified domain or onboarding@resend.dev)
      to: [companyEmail],    // Your company's email to receive the contact message
      reply_to: senderEmail, // Set the sender's email as the reply-to address
      subject: emailSubject,
      text: emailText,
      // You can also add an HTML version here if you want
      // html: `<p>${emailText.replace(/\n/g, '<br>')}</p>`
    });

    if (error) {
      console.error('Resend API Error (Contact Form):', error);
      return NextResponse.json({ error: 'Failed to send message.', details: error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!', data }, { status: 200 });

  } catch (err: any) {
    console.error('Error processing contact form request:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.', details: err.message }, { status: 500 });
  }
}