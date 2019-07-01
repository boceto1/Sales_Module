import { calculateTotalAmountOffer,
        calculateTotalAmountQuotation,
        calculateTotalAmountService,
} from '../../operations/quotation.operations';

import { Offer, OfferService } from '../../types/types';
import { offer1, offer2, quotation1, quotation2, service1 } from '../util';

const assert = require('chai').assert;

describe('calculate total amount of service',()=>{
    describe('When we have a service {amount:12,unitValue:1.5 }', () => {
        const calculatedService = calculateTotalAmountService(service1);
        it('service should be property total value', () => {
            assert.property(calculatedService, 'totalValue');
        });

        it('result should be 18', () => {
            assert.equal(calculatedService.totalValue, 18);
        });
    });
});

describe('calculate total amount of offer', () => {
    describe('When we have 1 offer', () => {

        const calculatedOffer = calculateTotalAmountOffer(offer1);
        it('service should be property total value', () => {
            assert.property(calculatedOffer, 'total');
        });

        it('total should be 18', () => {
            assert.equal(calculatedOffer.total, 18);
        });
    });
    describe('When we have 2 offers', () => {

        const calculatedOffer = calculateTotalAmountOffer(offer2);
        it('service should be property total value', () => {
            assert.property(calculatedOffer, 'total');
        });

        it('total should be 42', () => {
            assert.equal(calculatedOffer.total, 66);
        });
    });
});

describe('calculate total amount of offer', () => {
    describe('When we have 1 offer', () => {
        const service1: OfferService = {idService: 1, description: 'aaa', unitValue: 1.5,
                                       amount: 12};

        const offer: Offer = {services: [ service1 ]};

        const calculatedOffer = calculateTotalAmountOffer(offer);
        it('offer should be property total value', () => {
            assert.property(calculatedOffer, 'total');
        });

        it('total should be 18', () => {
            assert.equal(calculatedOffer.total, 18);
        });
    });
    describe('When we have 2 offers', () => {
        const service1: OfferService = {idService: 1, description: 'aaa', unitValue: 1.5,
                                       amount: 12};
        const service2: OfferService = {idService: 2, description: 'bbb', unitValue: 2,
        amount: 24};

        const offer: Offer = {services:[ service1, service2]};

        const calculatedOffer = calculateTotalAmountOffer(offer);
        it('offer should be property total value', () => {
            assert.property(calculatedOffer, 'total');
        });

        it('total should be 42', () => {
            assert.equal(calculatedOffer.total, 66);
        });
    });
});

describe('calculate values in quotations', () => {
    describe('When we have a quotation with 1 offer', () => {

        const calculatedQuotation = calculateTotalAmountQuotation(quotation1);

        it('length of offers should be 1', () => {
            assert.equal(calculatedQuotation.offers.length, 1);
        });

        it('quotation offer should be property total value', () => {
            assert.property(calculatedQuotation.offers[0], 'total');
        });

        it('total should be 18', () => {
            assert.equal(calculatedQuotation.offers[0].total, 18);
        });
    });
    describe('When we have a quotation with 2 offer', () => {
        const calculatedQuotation = calculateTotalAmountQuotation(quotation2);

        it('length of offers should be 2', () => {
            assert.equal(calculatedQuotation.offers.length, 2);
        });

        it('quotation offer1 should be property total value', () => {
            assert.property(calculatedQuotation.offers[0], 'total');
        });

        it('quotation offer2 should be property total value', () => {
            assert.property(calculatedQuotation.offers[1], 'total');
        });

        it('total should be 18', () => {
            assert.equal(calculatedQuotation.offers[0].total, 18);
        });

        it('total should be 66', () => {
            assert.equal(calculatedQuotation.offers[1].total, 66);
        });
    });
});
