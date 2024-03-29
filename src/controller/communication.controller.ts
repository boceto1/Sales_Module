import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import {
    createCommunication,
    deleteCommunicationById,
    findCommunicationById,
    getAllCommunications,
    getAllCommunicationsBySale,
    updateCommunicationById,
    getAllTypeBySale
} from '../operations/DB/communication.operation';
import { findSaleById, updateSaleByID } from '../operations/DB/sale.operation';
import { createMailCtrl } from '../operations/Util/mail.operation';
import { Communication, Sale, Mail } from '../types/types';

export const createCommunicationCtrl = async (req: Request, res: Response) => {
    const communication: Communication = req.body.communication;

    try {
        const createdCommunication = await createCommunication(communication);
        res.status(201).json({ createdCommunication });
    } catch (error) {
        res.status(500).json({ message: 'Problem to create communication', error });
    }
};

export const findCommunicationByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundCommunication = await findCommunicationById(id);
        if (!foundCommunication) {
            res.status(404).json({ message: 'Communication not found' });
            return;
        }
        res.status(200).json({ foundCommunication });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Idt the communication', error });
    }
};

export const findAllCommunicationsCtrl = async (req: Request, res: Response) => {
    const type: string = req.params.type;
    try {
        const communications = await getAllCommunications(type);
        if (!communications) {
            res.status(404).json({ message: 'Communications not found' });
            return;
        }
        res.status(200).json({ communications });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Idt the communication', error });
    }
};

export const updateCommunicationByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    const communication: Communication = req.body.communication;
    try {
        const updatedCommunication = await updateCommunicationById(id, communication);
        if (!updatedCommunication) {
            res.status(404).json({ message: 'Communication not found' });
            return;
        }
        res.status(200).json({ updatedCommunication });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Idt the communication', error });
    }
};

export const deleteCommunicationByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedCommunication = await deleteCommunicationById(id);
        if (!deletedCommunication) {
            res.status(404).json({ message: 'Communication not found' });
            return;
        }
        res.status(200).json({ deletedCommunication });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Idt the communication', error });
    }
};

export const createCommunicationBySale = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;
    const communication: Communication = req.body.communication;
    try {
        const foundSale: Sale = await findSaleById(idSale);
        if (!foundSale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }

        communication.idSale = foundSale._id;
        const newCommunication = await createCommunication(communication);

        foundSale.communications.push(newCommunication.id);
        const updatedSale = await updateSaleByID(foundSale._id, foundSale);

        res.status(200).json({ updatedSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};

export const getCommunicationsBySale = async (req: Request, res: Response) => {

    const idSale: ObjectId = req.params.idSale;

    try {
        const tasks = await getAllCommunicationsBySale(idSale);
        if (!tasks) {
            res.status(404).json({ message: 'Communications not found' });
            return;
        }
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Communications by Sale', error });
    }
};

export const getCommunicationsTypeBySale = async (req: Request, res: Response) => {

    const idSale: ObjectId = req.params.idSale;
    const type: String = req.params.type;

    try {
        const communication = await getAllTypeBySale(idSale, type);
        if (!communication) {
            res.status(404).json({ message: 'Communications not found' });
            return;
        }
        res.status(200).json({ communication });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Communications by Sale', error });
    }
};
export const createMailBySale = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;
    const communication: Communication = req.body.communication;
    const type: String = req.params.type;
    try {
        const foundSale: Sale = await findSaleById(idSale);
        if (!foundSale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        communication.idSale = foundSale._id;
        const newCommunication = await createCommunication(communication);
        foundSale.communications.push(newCommunication.id);
        const updatedSale = await updateSaleByID(foundSale._id, foundSale);
        if (type == "mail") {
            const mail: Mail = req.body.communication.email;
            await createMailCtrl(mail);
        }
        res.status(200).json({ updatedSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};