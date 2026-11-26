// Vercel Serverless Function — POST /api/payments/create-paypal-order
// Creates a PayPal sandbox order (or returns a mock if keys are absent)

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'USD', planId } = req.body ?? {};

  if (!amount || !planId) {
    return res.status(400).json({ error: 'Missing required fields: amount, planId' });
  }

  const clientId = process.env.PAYPAL_CLIENT_ID_SANDBOX;
  const clientSecret = process.env.PAYPAL_SECRET_SANDBOX;

  // If real PayPal sandbox keys are configured, call the real API
  if (clientId && clientSecret && clientId !== 'sb-sandbox-demo-paypal-client-id') {
    try {
      // Get access token
      const authResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: 'grant_type=client_credentials',
      });

      const authData = await authResponse.json();

      if (!authResponse.ok) {
        return res.status(authResponse.status).json({ error: 'PayPal auth failed' });
      }

      // Create order
      const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
              description: `Ada Hub ${planId} subscription (sandbox)`,
            },
          ],
          application_context: {
            brand_name: 'Ada Hub - Algorithm Adventures',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
          },
        }),
      });

      const order = await orderResponse.json();

      if (!orderResponse.ok) {
        return res.status(orderResponse.status).json({ error: order.message ?? 'PayPal error' });
      }

      return res.status(200).json({
        orderId: order.id,
        status: order.status,
        approvalUrl: order.links?.find((l: any) => l.rel === 'approve')?.href,
        sandbox: true,
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to create PayPal order', details: err.message });
    }
  }

  // Mock order for demo
  const mockOrderId = `pp_mock_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  return res.status(200).json({
    orderId: mockOrderId,
    status: 'CREATED',
    approvalUrl: null,
    sandbox: true,
    mock: true,
    message: 'Mock order created — set PAYPAL_CLIENT_ID_SANDBOX and PAYPAL_SECRET_SANDBOX for real sandbox.',
  });
}
