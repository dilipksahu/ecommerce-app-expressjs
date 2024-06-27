const { expect } = require('chai');
const nock = require('nock');
const orderService = require('../services/orderService');

require('../mocks/paymentGatewayMock');
require('../mocks/logisticsProviderMock');

describe('Order Service', () => {
    it('should process payment successfully', async () => {
      const paymentResponse = await orderService.processPayment({ amount: 2000, currency: 'usd' });
      expect(paymentResponse).to.have.property('status', 'succeeded');
    });
  
    it('should create shipment successfully', async () => {
      const shipmentResponse = await orderService.createShipment({ order_id: '12345' });
      expect(shipmentResponse).to.have.property('status', 'created');
      expect(shipmentResponse).to.have.property('tracking_number');
    });
});

