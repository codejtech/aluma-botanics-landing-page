import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function appendSignupToGoogleSheetWithAppsScript(params: {
  email: string;
  submittedAt: string;
  resendStatus: string;
  resendError: string;
}) {
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    throw new Error(
      'Missing GOOGLE_APPS_SCRIPT_URL environment variable.',
    );
  }

  const response = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(params),
    cache: 'no-store',
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Apps Script request failed: ${response.status} ${text}`);
  }

  let parsed: { ok?: boolean; error?: string } | null = null;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Apps Script returned non-JSON response: ${text}`);
  }

  if (!parsed?.ok) {
    throw new Error(parsed?.error || 'Apps Script did not confirm success.');
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() || '';

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toISOString();

    let resendStatus = 'skipped';
    let resendError = '';

    if (process.env.RESEND_API_KEY && process.env.LAUNCH_LIST_TO_EMAIL) {
      try {
        const result = await resend.emails.send({
          from:
            process.env.FROM_EMAIL ||
            'Aluma Botanics <onboarding@resend.dev>',
          to: [process.env.LAUNCH_LIST_TO_EMAIL],
          subject: 'New Aluma Botanics launch signup',
          replyTo: email,
          text: `New signup received from: ${email}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
              <h2>New launch list signup</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Submitted at:</strong> ${submittedAt}</p>
            </div>
          `,
        });

        if (result.error) {
          resendStatus = 'failed';
          resendError = result.error.message || 'Unknown Resend error';
          console.error('Resend returned an error:', result.error);
        } else {
          resendStatus = 'sent';
        }
      } catch (error) {
        resendStatus = 'failed';
        resendError =
          error instanceof Error ? error.message : 'Unknown Resend error';
        console.error('Resend send failed:', error);
      }
    }

    await appendSignupToGoogleSheetWithAppsScript({
      email,
      submittedAt,
      resendStatus,
      resendError,
    });

    return NextResponse.json({
      message: '✅ Thanks for joining the launch list.',
    });
  } catch (error) {
    console.error('Signup route error:', error);

    return NextResponse.json(
      { message: '❌ Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}