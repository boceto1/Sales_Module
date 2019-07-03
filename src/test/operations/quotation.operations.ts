import { createQuotation, disableLastQuotation, getLastQuotation, isAbleToAcceptQuotation, validateQuotation
} from '../../operations/quotation.operations';

import { quotation1, quotation2, quotations1, quotations2, quotationWithOutOffers, sale1, sale2 } from '../util';

const assert = require('chai').assert;

describe('disabled Last Quotation ', () => {
    describe('when I have an array with one quotation', () => {
        const updatedQuotations = disableLastQuotation(quotations1.concat());

        it('quotation should be false', () => {
            assert.equal(updatedQuotations.every(
                quotation => quotation.isValid === false),
            true);
        });
    });

    describe('when I have an array with one quotation', () => {
        const updatedQuotations = disableLastQuotation(quotations2.concat());
        it('quotation should be false', () => {
            assert.equal(updatedQuotations.every(
                quotation => quotation.isValid === false),
            true);
        });
    });
});

describe('create Quotation ', () => {
    describe('When we have a sale and add a quotation', () => {
        const updatedSale = createQuotation(sale1, quotation2);
        it('sale should have just one validQuotation', () => {
            assert( updatedSale.quotations.filter(
                quotation => quotation.isValid === true).length,
            1);
        });
    });
});

describe('get last Quotation ', () => {
    describe('When I has a sale with one quotaion', () => {
        it('isValid property to quotation equal true', ( ) => {
            assert.equal(getLastQuotation(sale1.quotations.concat()).isValid, true);
        });
    });
    describe('When I has a sale without quotations ', () => {
        it('quotation is undefinded', ( ) => {
            assert.equal(getLastQuotation([]), undefined);
        });
    });
    describe('When I has a sale with 2 quotations', () => {
        it('quotation is undefinded', ( ) => {
            assert.equal(getLastQuotation(sale2.quotations.concat()).isValid, true);
        });
    });
});

describe('Quotation is able to accept ', () => {
    describe('When I have a quotation without offers', () => {
        it('isValid property to quotation equal undefinded', ( ) => {
            assert.equal(isAbleToAcceptQuotation(quotationWithOutOffers), false);
        });
    });

    describe('When I have a quotation with 1 offer', () => {
        it('isValid property to quotation equal true', ( ) => {
            assert.equal(isAbleToAcceptQuotation(quotation1), true);
        });
    });
    describe('When I have a quotation with 2 offer', () => {
        it('isValid property to quotation equal false', ( ) => {
            assert.equal(isAbleToAcceptQuotation(quotation2), false);
        });
    });
});

describe('validate Quotation to create contract', () => {
    describe('When quotation has one offer', () => {
        it('result to be true', ( ) => {
            assert.equal(validateQuotation(quotations2), true);
        });
    });
});

/*describe('calculate total amount of service',()=>{
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
*/
