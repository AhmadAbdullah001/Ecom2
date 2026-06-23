// Test Cashfree API authentication
require('dotenv').config({ path: './server/.env' });

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_API_URL = process.env.CASHFREE_API_URL;

console.log('Testing Cashfree API...');
console.log('APP_ID:', CASHFREE_APP_ID ? CASHFREE_APP_ID.substring(0, 15) + '...' : 'NOT SET');
console.log('SECRET_KEY:', CASHFREE_SECRET_KEY ? CASHFREE_SECRET_KEY.substring(0, 15) + '...' : 'NOT SET');
console.log('API_URL:', CASHFREE_API_URL);

const testOrder = {
  order_id: `test_${Date.now()}`,
  order_amount: 100,
  order_currency: 'INR',
  customer_details: {
    customer_id: 'test_user',
    customer_email: 'test@example.com',
    customer_phone: '9876543210'
  },
  order_meta: {
    return_url: 'http://localhost:3001'
  }
};

console.log('\nSending request to:', `${CASHFREE_API_URL}/orders`);
console.log('Order data:', testOrder);

fetch(`${CASHFREE_API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-version': '2021-05-21',
    'x-client-id': CASHFREE_APP_ID,
    'x-client-secret': CASHFREE_SECRET_KEY
  },
  body: JSON.stringify(testOrder)
})
  .then(res => {
    console.log('\nResponse Status:', res.status);
    console.log('Response Headers:', Object.fromEntries(res.headers));
    return res.json();
  })
  .then(data => {
    console.log('\nResponse Data:');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('\nError:', err.message);
  });
