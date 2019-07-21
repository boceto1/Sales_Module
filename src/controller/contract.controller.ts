import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { findSaleById, updateSaleByID } from '../operations/DB/sale.operation';
import { Discount, Sale } from '../types/types';

export const addDiscountToContract = async (req: Request, res: Response) => {

    const idSale: ObjectId = req.params.idSale;
    const discounts: [Discount] = req.body.discounts;

    const sale: Sale = await findSaleById(idSale);

    if (!sale) {
            res.status(404).json({error: 'Sale not found'});
            return;
        }

    if (!sale.contract) {
            res.status(404).json({error: 'Contract not found'});
            return;
        }

    const contract = sale.contract;

    contract.discounts = discounts;

    const updatedSale = await updateSaleByID(sale._id, sale);

    if (!updatedSale) {
            res.status(500).json({error: 'Problem to update Document' });
            return;
        }

    res.status(200).json({contract: updatedSale.contract});
};
