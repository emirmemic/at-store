import { NextRequest } from 'next/server';
import crypto from 'crypto';

const MONRI_TEST = 'https://ipgtest.monri.com';
const MONRI_PROD = 'https://ipg.monri.com';

export async function POST(req: NextRequest) {
  try {
    const { paymentId, amount } = (await req.json()) as {
      paymentId: string; // from /v2/payment/new response
      amount: number; // MAJOR units
    };

    if (!paymentId || typeof amount !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Monri requires MINOR units
    const body = JSON.stringify({ amount: Math.round(amount * 100) });

    const merchantKey = process.env.MONRI_MERCHANT_KEY!;
    const authenticityToken =
      process.env.MONRI_AUTHENTICITY_TOKEN ??
      process.env.NEXT_PUBLIC_MONRI_AUTH_TOKEN!;

    if (!merchantKey || !authenticityToken) {
      return new Response(JSON.stringify({ error: 'Missing Monri env vars' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update endpoint per Payment API docs
    // path: /v2/payment/<payment-id>/update  (POST)
    const fullpath = `/v2/payment/${paymentId}/update`;
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const digest = crypto
      .createHash('sha512')
      .update(
        merchantKey + timestamp + authenticityToken + fullpath + body,
        'utf8'
      )
      .digest('hex');

    const authHeader = `WP3-v2.1 ${authenticityToken} ${timestamp} ${digest}`;

    const base =
      process.env.NODE_ENV === 'production' ? MONRI_PROD : MONRI_TEST;

    const res = await fetch(`${base}${fullpath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authHeader,
      },
      body,
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Response includes status + (same) client_secret + amount/currency/id
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
