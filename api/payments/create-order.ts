// Vercel Serverless Function — POST /api/payments/create-order
// Creates a Razorpay sandbox order (or returns a mock if keys are absent)

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'INR', planId, receipt } = req.body ?? {};

  if (!amount || !planId) {
    return res.status(400).json({ error: 'Missing required fields: amount, planId' });
  }

  const keyId = process.env.RAZORPAY_KEY_ID_SANDBOX;
  const keySecret = process.env.RAZORPAY_KEY_SECRET_SANDBOX;

  // If real Razorpay sandbox keys are configured, call the real API
  if (keyId && keySecret && keyId !== 'rzp_test_sandbox_demo_key') {
    try {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Razorpay expects paise
          currency,
          receipt: receipt ?? `receipt_${planId}_${Date.now()}`,
          notes: { planId, sandbox: 'true' },
        }),
      });

      const order = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: order.error?.description ?? 'Razorpay error' });
      }

      return res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
        sandbox: true,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to create Razorpay order', details: err.message });
    }
  }

  // Mock order for demo (no real keys configured)
  const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  return res.status(200).json({
    orderId: mockOrderId,
    amount: Math.round(amount * 100),
    currency,
    keyId: 'rzp_test_sandbox_demo_key',
    sandbox: true,
    mock: true,
    message: 'Mock order created — set RAZORPAY_KEY_ID_SANDBOX and RAZORPAY_KEY_SECRET_SANDBOX for real sandbox.',
  });
}
