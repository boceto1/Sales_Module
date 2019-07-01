import { OfferService, Offer, Quotation } from "../types/types";

export const service1: OfferService = {
    idService: 1,
    description: 'aaa',
    unitValue: 1.5,
    amount: 12 };

export const service2: OfferService = {
    idService: 2,
    description: 'bbb',
    unitValue: 2,
    amount: 24};

export const service3: OfferService = {
    idService: 3,
    description: 'ccc',
    unitValue: 5,
    amount: 10};

export const offer1: Offer = {services: [ service1 ]};
export const offer2: Offer = {services: [ service1, service2 ]};
export const offer3: Offer = {services: [ service1, service2, service3 ]};


export const quotation1: Quotation = {
    idCompany: 1,
    description: 'quotation1',
    offers: [offer1],
    creationDate: new Date('12-12-12'),
    isValid: true,
}

export const quotation2: Quotation = {
    idCompany: 1,
    description: 'quotation1',
    offers: [offer1, offer2],
    creationDate: new Date('12-12-12'),
    isValid: true,
}

export const quotation3: Quotation = {
    idCompany: 1,
    description: 'quotation1',
    offers: [offer1, offer2, offer3],
    creationDate: new Date('12-12-12'),
    isValid: true,
};