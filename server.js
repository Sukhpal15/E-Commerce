const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/fetchPayments', async (req, res) => {
  try {
    const apiKey = 'your_api_key'; // Replace with your actual Razorpay API key
    const apiUrl = 'https://api.razorpay.com/v1/payments';

    const headers = {
      'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get(apiUrl, { headers });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
