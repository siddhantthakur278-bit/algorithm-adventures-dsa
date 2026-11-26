// Vercel Serverless Function — POST /api/payments/create-stripe-session
// Creates a Stripe Checkout sandbox session (or returns a mock if keys are absent)

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'usd', planId, successUrl, cancelUrl } = req.body ?? {};

  if (!amount || !planId) {
    return res.status(400).json({ error: 'Missing required fields: amount, planId' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY_SANDBOX;

  // If real Stripe test key is configured
  if (secretKey && secretKey.startsWith('sk_test_')) {
    try {
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'mode': 'payment',
          'line_items[0][price_data][currency]': currency,
          'line_items[0][price_data][product_data][name]': `Ada Hub ${planId} Plan`,
          'line_items[0][price_data][unit_amount]': String(Math.round(amount * 100)),
          'line_items[0][quantity]': '1',
          'success_url': successUrl ?? `${req.headers.origin ?? 'http://localhost:5173'}/?payment=success`,
          'cancel_url': cancelUrl ?? `${req.headers.origin ?? 'http://localhost:5173'}/?payment=cancelled`,
          'metadata[planId]': planId,
          'metadata[sandbox]': 'true',
        }).toString(),
      });

      const session = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: session.error?.message ?? 'Stripe error' });
      }

      return res.status(200).json({
        sessionId: session.id,
        url: session.url,
        sandbox: true,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to create Stripe session', details: err.message });
    }
  }

  // Mock session
  const mockSessionId = `cs_test_mock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  return res.status(200).json({
    sessionId: mockSessionId,
    url: null,
    sandbox: true,
    mock: true,
    message: 'Mock session created — set STRIPE_SECRET_KEY_SANDBOX (sk_test_...) for real sandbox.',
  });
}
