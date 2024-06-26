const nock = require('nock');

nock('https://api.logistics.com')
  .post('/v1/shipments')
  .reply(200, {
    id: 'shp_1Iqgzk2eZvKYlo2C8bH7z8xG',
    status: 'created',
    tracking_number: '1Z999AA10123456784'
  });