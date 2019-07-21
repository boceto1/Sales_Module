import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import {
    createSale,
    deleteSaleById,
    findSaleById,
    findSalesBySeller,
    findSalesByPhase,
} from '../operations/DB/sale.operation';
import { Sale } from '../types/types';

export const createServiceCtrl = async (req: Request, res: Response) => {
    const idSeller: string = req.params.idSeller;
    const service: Sale = req.body.sale;

    try {
        const createdSale = await createSale(idSeller, service);
        res.status(201).json({ createdSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to create Sale', error });
    }
};

export const getSaleByIdCtrl = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;
    try {
        const foundSale = await findSaleById(idSale);
        if (!foundSale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        res.status(200).json({ foundSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};

export const getSalesBySellerCtrl = async (req: Request, res: Response) => {
    const idSeller: string = req.params.idSeller;
    try {
        const foundSales = await findSalesBySeller(idSeller);
        if (!foundSales) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        res.status(200).json({ foundSales });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};

export const getSalesByPhaseCtrl = async (req: Request, res: Response) => {
    const idSeller: string = req.params.idSeller;
    const phase: string = req.params.phase;
    try {
        const foundSales = await findSalesByPhase(idSeller, phase);
        if (!foundSales) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        res.status(200).json({ foundSales });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};

export const deleteSaleByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.idSale;
    try {
        const deleteSale = await deleteSaleById(id);
        if (!deleteSale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        res.status(200).json({ deleteSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to delete Sale', error });
    }
};
