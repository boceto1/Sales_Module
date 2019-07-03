import { Offer, OfferService, Quotation, Sale } from "../types/types";

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

export const offer1: Offer = {services: [  service1 ]};
export const offer2: Offer = {services: [ service1, service2 ]};
export const offer3: Offer = {services: [ service1, service2, service3 ]};


export const quotation1: Quotation = {
    idCompany: 1,
    description: 'quotation1',
    offers: [offer1],
    creationDate: new Date('12-12-12'),
    isValid: true,
};

export const quotation2: Quotation = {
    idCompany: 1,
    description: 'quotation2',
    offers: [offer1, offer2],
    creationDate: new Date('12-12-12'),
    isValid: true,
};

export const quotation3: Quotation = {
    idCompany: 1,
    description: 'quotation3',
    offers: [offer1, offer2, offer3],
    creationDate: new Date('12-12-12'),
    isValid: true,
};

export const quotationWithOutOffers: Quotation = {
    idCompany: 1,
    description: 'quotation without offers',
    offers: [],
    creationDate: new Date('12-12-12'),
    isValid: true,
};

export const disabledQuotation1: Quotation = {
    idCompany: 1,
    description: 'disabled Quotation',
    offers: [offer1, offer2, offer3],
    creationDate: new Date('12-12-12'),
    isValid: true,
};

export const quotations1: Quotation[] = [ quotation1 ];
export const quotations2: Quotation[] = [ quotation1 , disabledQuotation1 ];

export const sale1: Sale = {
    name: 'test',
    description: 'test 1',
    idSeller: '1',
    idCompany: '1',
    phase: 'Habilitado para la venta',
    creationDate: new Date('12-12-12'),
    modificationDate: new Date('13-12-12'),
    isClosed: false,
    quotations: quotations1
};

export const sale2: Sale = {
    name: 'test',
    description: 'test 1',
    idSeller: '1',
    idCompany: '1',
    phase: 'Habilitado para la venta',
    creationDate: new Date('12-12-12'),
    modificationDate: new Date('13-12-12'),
    isClosed: false,
    quotations: quotations2
}