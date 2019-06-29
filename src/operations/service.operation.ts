import { OFFER , SERVICE } from '../models/Offer';
import { Offer, Service } from '../types/types';

export const createService = async (service: Service): Promise<any> => {
    try {
        const createdService = new SERVICE(service);
        const resposeCreatedService = await createdService.save();
        return resposeCreatedService;
    } catch (error:Er) {
        console.log(error);
    }
};
