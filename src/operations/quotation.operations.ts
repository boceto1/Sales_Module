import { ObjectId } from 'bson';
import R from 'ramda';
import {  Offer, OfferService, Quotation, Sale, Service, Contract  } from '../types/types';
import { findServiceById } from './DB/service.operation';

export const createQuotation = (sale: Sale, quotation: Quotation ): Sale => {
    const quotations = sale.quotations;
    const disabledQuotations = disableLastQuotation(quotations);
    const updateQuotations = disabledQuotations.concat(quotation);

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
};

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
};

export const calculateTotalAmountService = async (service: OfferService): Promise<OfferService> =>  {
    const serviceC: Service = await findServiceById(service._id);
    service.totalValue = serviceC.unitValue * service.amount;
    return service;
};

export const findQuotationByID = (id: ObjectId, quotations: Quotation[]): Quotation => {

    const quotation = quotations.filter(quotation => (quotation._id + '') === id + '');
    if (quotation.length === 0) { return null; }
    return quotation[0];

};

export const sortQuotationByDate = (quotations: Quotation[]): Quotation[] =>
    quotations.sort((date1, date2) => {
        if (date1 > date2) { return -1; }
        if (date1 < date2) { return 1; }
        return 0;
});

export const getLastQuotation = ( quotations: Quotation[]): Quotation => {
    return R.find(R.propEq('isValid', true))(quotations);
};

const isAbleOffer = ( offers: Offer[]): boolean => offers.length === 1;

export const isAbleToAcceptQuotation = (quotation: Quotation): boolean =>
                                R.propSatisfies(isAbleOffer, 'offers', quotation);

const disableQuotation = (quotation: Quotation): Quotation => {
    quotation.isValid = false;
    return quotation;
};

export const disableLastQuotation = (quotations: Quotation[]): Quotation[] => {
    const indexLastQuotation = R.findIndex(R.propEq('isValid', true))(quotations);
    const updatedQuotations = R.adjust(indexLastQuotation, disableQuotation, quotations);
    return updatedQuotations;
};

export const validateQuotation =  R.pipe(getLastQuotation, isAbleToAcceptQuotation);

const createContrat = (idCompany: string, description: string , quotation: Quotation): Contract => (
        {
            idCompany,
            creationDate: new Date(),
            description,
            offer: quotation.offers[0],
            total: quotation.offers[0].total
        }
);

export const acceptQuotation = ( sale: Sale ): Sale => {
    const quotation = getLastQuotation(sale.quotations);
    sale.quotations = disableLastQuotation(sale.quotations);
    sale.contract = createContrat(sale.idCompany, sale.description,quotation);
    return sale;
};