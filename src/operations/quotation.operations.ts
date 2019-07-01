import {  Offer, OfferService, Quotation, Sale, Service  } from '../types/types';
import { findServiceById } from './DB/service.operation';

export const createQuotation = (sale: Sale, quotation: Quotation ): Sale => {
    const quotations = sale.quotations;
    const updateQuotations = quotations.concat(quotation);

    if (quotations.length === updateQuotations.length) {
        return null;
    }

    sale.quotations = updateQuotations;

    return sale;
};

export const calculateTotalAmountQuotation = async (quotation: Quotation): Promise<Quotation> => {
    const updateQuotation = quotation;
    updateQuotation.offers = await calculateTotalOffers(updateQuotation.offers);
    return updateQuotation;
};

export const calculateTotalOffers = async (offers: Offer[]): Promise<Offer[]> => {
    const unsresolverOffers: Array<Promise<Offer>>   = offers.map(calculateTotalAmountOffer);
    const calculatedOffers = await Promise.all(unsresolverOffers);
    return calculatedOffers;
}

export const calculateTotalAmountOffer = async (offer: Offer): Promise<Offer> => {
    const updateOffer = offer;
    updateOffer.services = await calculateTotalServices(updateOffer.services);
    const totalOffer = updateOffer.services.reduce((total, currentService) =>
                             total + currentService.totalValue , 0);

    updateOffer.total = totalOffer;
    return updateOffer;
};

export const calculateTotalServices = async (services: OfferService[]): Promise<OfferService[]> => {
    const unresolvedPromiseServices: Array<Promise<OfferService>> = await services.map(calculateTotalAmountService);
    const updatedServices = await Promise.all(unresolvedPromiseServices);
    return updatedServices;
}

export const calculateTotalAmountService = async (service: OfferService): Promise<OfferService> =>  {
    const serviceC: Service = await findServiceById(service._id);
    console.log(serviceC);
    service.totalValue = serviceC.unitValue * service.amount;
    return service;
};
