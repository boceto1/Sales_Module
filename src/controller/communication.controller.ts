import { ObjectId } from 'bson';
import {Request, Response} from 'express';
import {createCommunication,
    deleteCommunicationById,
    findCommunicationById,
    getAllCommunications,
    updateCommunicationById
} from '../operations/DB/communication.operation';
import { Communication } from '../types/types';

export const createCommunicationCtrl = async (req: Request, res: Response ) => {
    const communication: Communication = req.body.communication;

    try {
        const createdCommunication = await createCommunication(communication);
        res.status(201).json({createdCommunication});
    } catch (error) {
        res.status(500).json({message: 'Problem to create communication', error});
    }
};

export const findCommunicationByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundCommunication = await findCommunicationById(id);
        if ( !foundCommunication ) {
            res.status(404).json({message: 'Communication not found'});
            return;
        }
        res.status(200).json({foundCommunication});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the communication', error});
    }
};

export const findAllCommunicationsCtrl = async (_req: Request, res: Response) => {

    try {
        const communications = await getAllCommunications();
        if ( !communications ) {
            res.status(404).json({message: 'Communications not found'});
            return;
        }
        res.status(200).json({communications});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the communication', error});
    }
}

export const updateCommunicationByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    const communication: Communication = req.body.communication;
    try {
        const updatedCommunication = await updateCommunicationById(id,communication);
        if ( !updatedCommunication ) {
            res.status(404).json({message: 'Communication not found'});
            return;
        }
        res.status(200).json({updatedCommunication});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the communication', error});
    }
}

export const deleteCommunicationByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedCommunication = await deleteCommunicationById(id);
        if ( !deletedCommunication ) {
            res.status(404).json({message: 'Communication not found'});
            return;
        }
        res.status(200).json({deletedCommunication});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the communication', error});
    }
};
