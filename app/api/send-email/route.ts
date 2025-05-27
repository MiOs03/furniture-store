import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { config } from '@/lib/config';

export async function POST(request: NextRequest) {
  console.log('Email API called');
  
  const { apiKey, fromEmail, companyEmail } = config.resend;

  console.log('Environment check:', {
    hasApiKey: !!apiKey,
    hasCompanyEmail: !!companyEmail,
    fromEmail
  });

  if (!apiKey) {
    console.error('RESEND_API_KEY is not defined in environment variables');
    return NextResponse.json({ error: 'Server configuration error: Missing API key' }, { status: 500 });
  }

  if (!companyEmail) {
    console.error('COMPANY_EMAIL is not defined in environment variables');
    return NextResponse.json({ error: 'Server configuration error: Missing company email' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const body = await request.json();
    console.log('Request body:', body);

    const {
      from: customerEmail,
      subject,
      text,
    } = body;

    if (!customerEmail || !subject || !text) {
      console.error('Missing required fields:', { customerEmail, subject, text });
      return NextResponse.json({ error: 'Missing required email fields' }, { status: 400 });
    }

    console.log('Sending email to:', companyEmail);
    console.log('From email:', fromEmail);
    console.log('Reply to:', customerEmail);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [companyEmail],
      replyTo: customerEmail,
      subject: subject,
      text: text,
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
      message: 'Email sent successfully!', 
      data 
    }, { status: 200 });

  } catch (err: any) {
    console.error('Error processing email request:', err);
    return NextResponse.json({ 
      error: 'An unexpected error occurred', 
      details: err.message 
    }, { status: 500 });
  }
}