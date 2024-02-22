const express = require('express');
const app = express();
const port = 3000;

// This should be replaced with your actual secret key
// and stored in environment variables for production
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

app.use(express.json()); // Middleware to parse JSON bodies

// Endpoint to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    // Assuming you're sending the amount and currency from the client
    const { amount, currency } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // Add any other necessary payment request parameters
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      // You can send any other information required by the client here
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
