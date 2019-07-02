import { ObjectId } from 'bson';
import { COMMUNICATION } from '../../models/Communication';
import {  Communication } from '../../types/types';

export const createCommunication = async (communication: Communication): Promise<any> => {
        const createdCommunication = new COMMUNICATION(communication);
        const resposeCreatedCommunication= await createdCommunication.save();
        return resposeCreatedCommunication;
};

export const findCommunicationById = async (id: ObjectId): Promise<any> => COMMUNICATION.findById(id);

export const getAllCommunications = async (): Promise<any> => COMMUNICATION.find();

export const updateCommunicationById = async (id: ObjectId, communication: Communication): Promise<any> =>
                                        COMMUNICATION.findByIdAndUpdate(id, communication, {new: true});

export const deleteCommunicationById = async (id: ObjectId): Promise<any> =>
                                        COMMUNICATION.findByIdAndDelete(id);
