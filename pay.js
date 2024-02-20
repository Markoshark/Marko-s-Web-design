const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Mock function to create a payment request
// Replace with your payment processor's API details
async function createPayment(amount, currency) {
  const response = await fetch('https://api.paymentprocessor.com/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY_HERE'
    },
    body: JSON.stringify({
      price: amount,
      currency: currency,
      // Additional payment request parameters as required by your processor
    })
  });
  
  return response.json(); // Assuming the API responds with JSON
}

app.get('/create-payment/:amount/:currency', async (req, res) => {
  const { amount, currency } = req.params;
  
  try {
    const paymentDetails = await createPayment(amount, currency);
    res.json(paymentDetails); // Send back payment details to the frontend
  } catch (error) {
    console.error('Payment creation failed:', error);
    res.status(500).send('Failed to create payment');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
