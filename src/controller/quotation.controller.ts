import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { findSaleById, updateSale } from '../operations/DB/sale.operation';
import { calculateTotalAmountQuotation, createQuotation } from '../operations/quotation.operations';
import { Quotation, Sale } from '../types/types';

export const createQuotationCtrl = async (req: Request, res: Response): Promise<any> => {
    const idSale: ObjectId = req.params.idSale;
    const quotation: Quotation = req.body.quotation;
    const sale: Sale = await findSaleById(idSale);

    if (!sale) {
        res.status(404).json({message: 'Sale not fount'});
        return;
    }

    const calculatedQuotation = await calculateTotalAmountQuotation(quotation);
    const updatedQuotationSale = createQuotation(sale, calculatedQuotation);

    if ( !updatedQuotationSale ) {
        res.status(400).json({message: 'It\'s not posible add quotation'});
        return;
    }
    try {
        const updatedSale: Sale = await updateSale(updatedQuotationSale);
        res.status(201).json(updatedSale.quotations);
        return;
    } catch (error) {
        res.status(400).json({message: 'It\'s not posible add quotation', error});
        return;
    }
};
