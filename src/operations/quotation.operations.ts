import {  Offer, OfferService, Quotation, Sale  } from '../types/types';

export const createQuotation = (sale: Sale, quotation: Quotation ): Sale => {
    const quotations = sale.quotations;
    const updateQuotations = quotations.concat(quotation);

    if (quotations.length === updateQuotations.length) {
        return null;
    }

    sale.quotations = updateQuotations;

    return sale;
};

export const calculateTotalAmountQuotation = (quotation: Quotation): Quotation => {
    const updateQuotation = quotation;
    updateQuotation.offers = updateQuotation.offers.map(calculateTotalAmountOffer);
    return updateQuotation;
};

export const calculateTotalAmountOffer = (offer: Offer): Offer => {
    const updateOffer = offer;
    updateOffer.services = updateOffer.services.map(calculateTotalAmountService);
    const totalOffer = updateOffer.services.reduce((total, currentService) =>
                             total + currentService.totalValue , 0);

    updateOffer.total = totalOffer;
    return updateOffer;
};

export const calculateTotalAmountService = (service: OfferService): OfferService =>  {
     service.totalValue = service.unitValue * service.amount;
     return service;
};
