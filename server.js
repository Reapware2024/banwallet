const braintree = require('braintree');
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'h2dc4w2htwd7kk3n',
  publicKey: '4g6d3ww7gh3n6tq6',
  privateKey: '919f30c94ec058cc88e98279a8959416'
});

app.post('/applepay/payment-authorization', (req, res) => {
  const payment = req.body.payment;

 
  gateway.transaction.sale({
    amount: payment.transactionAmount,
    paymentMethodNonce: payment.token.paymentData,
    options: {
      submitForSettlement: true
    }
  }, (error, result) => {
    if (error || !result.success) {
      res.json({ status: 'failure' });
    } else {
      res.json({ status: 'success' });
    }
  });
});
