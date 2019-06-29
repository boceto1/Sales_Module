import {NextFunction, Request, Response} from 'express';
import {createService} from '../operations/service.operation';
import { Service } from '../types/types';

export const createServiceCtrl = async (req: Request, res: Response, next: NextFunction) => {
    const service: Service = req.body.service;

    try {
        const createdService = await createService(service);
        res.status(200).json({createdService});
    } catch (error) {
        res.status(500).json({message: 'Problem to create Service'});
    }
};
