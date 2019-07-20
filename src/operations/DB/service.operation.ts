import { ObjectId } from 'bson';
import { SERVICE } from '../../models/Service';
import {  Service } from '../../types/types';

export const createService = async (service: Service): Promise<any> => {
        const createdService = new SERVICE(service);
        const resposeCreatedService = await createdService.save();
        return resposeCreatedService;
};

export const findServiceById = async (id: ObjectId): Promise<any> => SERVICE.findById(id);

export const findServicesBySeller = async (idSeller): Promise<any> => SERVICE.find({idSeller});

export const getAllServices = async (): Promise<any> => SERVICE.find();

export const updateServiceById = async (id: ObjectId, service: Service): Promise<any> =>
                                    SERVICE.findByIdAndUpdate(id, service, {new: true});

export const deleteServiceById = async (id: ObjectId): Promise<any> =>
                                    SERVICE.findByIdAndDelete(id);
