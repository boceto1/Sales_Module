import { ObjectId } from 'bson';
import {Request, Response} from 'express';
import {createService,
    deleteServiceById,
    findServiceById,
    getAllServices,
    updateServiceById
} from '../operations/DB/service.operation';
import { Service } from '../types/types';

export const createServiceCtrl = async (req: Request, res: Response ) => {
    const service: Service = req.body.service;

    try {
        const createdService = await createService(service);
        res.status(200).json({createdService});
    } catch (error) {
        res.status(500).json({message: 'Problem to create Service', error});
    }
};

export const findServiceByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundService = await findServiceById(id);
        if ( !foundService ) {
            res.status(404).json({message: 'Service not found'});
            return;
        }
        res.status(200).json({foundService});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the service', error});
    }
};

export const findAllServicesCtrl = async (_req: Request, res: Response) => {

    try {
        const services = await getAllServices();
        if ( !services ) {
            res.status(404).json({message: 'Services not found'});
            return;
        }
        res.status(200).json({services});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the service', error});
    }
}

export const updateServiceByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    const service: Service = req.body.service;
    try {
        const updatedService = await updateServiceById(id,service);
        if ( !updatedService ) {
            res.status(404).json({message: 'Services not found'});
            return;
        }
        res.status(200).json({updatedService});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the service', error});
    }
}

export const deleteServiceByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedService = await deleteServiceById(id);
        if ( !deletedService ) {
            res.status(404).json({message: 'Services not found'});
            return;
        }
        res.status(200).json({deletedService});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the service', error});
    }
};
