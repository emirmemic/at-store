import crypto from 'crypto';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Parse incoming order data
    const reqBody = await req.json();
    const { amount, currency, order_number, order_info, transaction_type } =
      reqBody;
    const body = JSON.stringify({
      amount,
      currency,
      order_number,
      order_info,
      transaction_type,
    });

    const merchantKey = process.env.MONRI_MERCHANT_KEY;
    const authToken = process.env.NEXT_PUBLIC_MONRI_AUTH_TOKEN;

    // 2. Build Monri auth header
    const timestamp = Date.now().toString();
    const fullPath = '/v2/payment/new';
    const hashInput = merchantKey + timestamp + authToken + fullPath + body;

    const digest = crypto.createHash('sha512').update(hashInput).digest('hex');
    const authHeader = `WP3-v2.1 ${authToken} ${timestamp} ${digest}`;

    // 3. Call Monri API
    const isProduction = process.env.NODE_ENV === 'production';
    const monriUrl = isProduction
      ? 'https://ipg.monri.com'
      : 'https://ipgtest.monri.com';
    const monriRes = await fetch(`${monriUrl}/v2/payment/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: authHeader,
      },
      body,
    });

    const monriData = await monriRes.json();

    if (!monriRes.ok) {
      return new Response(JSON.stringify({ error: monriData }), {
        status: monriRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Return clientSecret to front end
    return new Response(
      JSON.stringify({ clientSecret: monriData.client_secret }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
