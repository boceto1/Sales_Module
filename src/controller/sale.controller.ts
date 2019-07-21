import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import {
    createSale,
    deleteSaleById,
    findSaleById,
    findSalesByPhase,
    findSalesBySeller,
    updateSaleByID,
} from '../operations/DB/sale.operation';

import { Contract, Sale } from '../types/types';

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
        const foundSale: Sale = await findSaleById(idSale);
        if (!foundSale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }

        foundSale.subtotal = calcualteSubTotal(foundSale);
        foundSale.total = foundSale.subtotal + foundSale.subtotal * 0.12;

        res.status(200).json({sale: foundSale, subtotal: foundSale.subtotal, total: foundSale.total });
        res.status(200).json({ foundSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};

export const getSalesBySellerCtrl = async (req: Request, res: Response) => {
    const idSeller: string = req.params.idSeller;
    const all: boolean = req.query.all || null;
    try {
        const sales: [Sale] = await findSalesBySeller(idSeller);

        if (!sales) {
            res.status(404).json({message: 'Sale not found'});
            return;
        }

        if (all) {
            res.status(200).json({sales});
        }

        const foundSales = sales.filter(sale => !sale.isClosed);

        res.status(200).json({foundSales});

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
}

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

export const closeSale = async (req: Request, res: Response ) => {

    const idSale: ObjectId = req.params.idSale;

    const foundSale: Sale = await findSaleById(idSale);
    if (!foundSale) {
            res.status(404).json({message: 'Sale not found'});
            return;
    }

    if (!foundSale.contract) {
        res.status(404).json({message: 'Sale doesn\'t has contract '});
        return;
    }

    foundSale.phase = 'Cerrado';
    foundSale.isClosed = true;
    foundSale.subtotal = calcualteSubTotal(foundSale);
    foundSale.total = foundSale.subtotal + foundSale.subtotal * 0.12;

    const closedSale = await updateSaleByID(foundSale._id, foundSale);

    if (!closeSale) {
        res.status(500).json({error: 'Error to closed Sale'});
        return;
    }

    res.status(200).json({sale: closedSale});

};

export const cancelSale = async (req: Request, res: Response) => {

    const idSale: ObjectId = req.params.idSale;

    const foundSale: Sale = await findSaleById(idSale);

    if (!foundSale) {
            res.status(404).json({message: 'Sale not found'});
            return;
    }

    foundSale.isClosed = true;

    const cancelSale = await updateSaleByID(foundSale._id, foundSale);

    if (!closeSale) {
        res.status(500).json({error: 'Error to cancel Sale'});
        return;
    }

    res.status(200).json({sale: cancelSale});

};

const calcualteSubTotal = (sale: Sale): number => {

        if (!sale.contract) {
            return 0;
        }

        const discounts = percentageDiscounts(sale.contract);
        const total = sale.contract.total;
        return total - total * (discounts / 100);
};

const percentageDiscounts = (contract: Contract): number => {

    if (!contract.discounts) {
        return 0;
    }

    const  { discounts } = contract;
    const percentage = discounts.reduce(( acc, curr) => acc + curr.percentage , 0);
    return percentage;
};
