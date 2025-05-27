import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';

export async function POST(request: NextRequest) {
  console.log('Contact API called');
  
  const { apiKey, fromEmail, companyEmail } = config.resend;

  console.log('Environment check:', {
    hasApiKey: !!apiKey,
    hasCompanyEmail: !!companyEmail,
    fromEmail
  });

  try {
    const resend = new Resend(apiKey);
    const body = await request.json();
    console.log('Request body:', body);

    const { firstName, lastName, email: senderEmail, message } = body;

    if (!firstName || !lastName || !senderEmail || !message) {
      console.error('Missing required fields:', { firstName, lastName, senderEmail, message });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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

    console.log('Sending email to:', companyEmail);
    console.log('From email:', fromEmail);
    console.log('Reply to:', senderEmail);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [companyEmail],
      replyTo: senderEmail,
      subject: emailSubject,
      text: emailText,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ 
        error: 'Failed to send email', 
        details: error 
      }, { status: 500 });
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ 
      message: 'Message sent successfully!', 
      data 
    }, { status: 200 });

  } catch (err: any) {
    console.error('Error processing contact form request:', err);
    return NextResponse.json({ 
      error: 'An unexpected error occurred', 
      details: err.message 
    }, { status: 500 });
  }
}