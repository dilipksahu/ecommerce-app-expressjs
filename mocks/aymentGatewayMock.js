const nock = require('nock');

nock('https://api.stripe.com')
  .post('/v1/charges')
  .reply(200, {
    id: 'ch_1Iqgzk2eZvKYlo2C8bH7z8xF',
    amount: 2000,
    currency: 'usd',
    status: 'succeeded'
  });