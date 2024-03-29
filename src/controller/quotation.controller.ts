import { ObjectId } from 'bson';
import { Request, Response } from 'express';
import { findSaleById, updateSale, updateSaleByID } from '../operations/DB/sale.operation';
import {
    acceptQuotation,
    calculateTotalAmountQuotation,
    createQuotation,
    findQuotationByID,
    sortQuotationByDate,
    validateQuotation,
} from '../operations/quotation.operations';
import {
    createPDF, createCommunicationMail,
} from '../operations/mail.operations';

import { Quotation, Sale, Company, Mail } from '../types/types';

export const createQuotationCtrl = async (req: Request, res: Response): Promise<any> => {
    const idSale: ObjectId = req.params.idSale;
    const quotation: Quotation = req.body.quotation;
    quotation.creationDate = new Date();
    const company: Company[] = req.body.company;
    const sale: Sale = await findSaleById(idSale);

    if (!sale) {
        res.status(404).json({ message: 'Sale not fount' });
        return;
    }

    const calculatedQuotation: Quotation = await calculateTotalAmountQuotation(quotation);
    const updatedQuotationSale: Sale = createQuotation(sale, calculatedQuotation);
    if (!updatedQuotationSale) {
        res.status(400).json({ message: 'It\'s not posible add quotation' });
        return;
    }
    try {
        const updatedSale: Sale = await updateSale(updatedQuotationSale);
        const index = updatedSale.quotations.length - 1;
        const mail: Mail = await createPDF(updatedSale.quotations[index], company, calculatedQuotation);
        await createCommunicationMail(idSale, mail, res);
        res.status(201).json(updatedSale.quotations);
        return;
    } catch (error) {
        res.status(400).json({ message: 'It\'s not posible add quotation', error });
        return;
    }
};

export const getQuotationsBySaleCtrl = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;
    const sale: Sale = await findSaleById(idSale);

    if (!sale) {
        res.status(404).json({ message: 'Sale not fount' });
        return;
    }

    if (sale.quotations.length === 0) {
        res.status(404).json({ message: 'Sale hasn\'t quotations ' });
        return;
    }

    const quotations = sortQuotationByDate(sale.quotations);
    res.status(200).json({quotations});
};

export const getSaleQuotationById = async (req: Request, res: Response) => {
    /* refactor code using middleware */
    const idSale: ObjectId = req.params.idSale;
    const idQuotation: ObjectId = req.params.idQuotation;

    const sale: Sale = await findSaleById(idSale);

    if (!sale) {
        res.status(404).json({ message: 'Sale not fount' });
        return;
    }

    if (sale.quotations.length === 0) {
        res.status(404).json({ message: 'Sale hasn\'t quotations ' });
        return;
    }

    const quotation: Quotation = findQuotationByID(idQuotation, sale.quotations);

    if (!quotation) {
        res.status(404).json({ message: 'Quotation not found ' });
        return;
    }

    res.status(200).json(quotation);
};

export const acceptQuotationCtrl = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;

    const sale: Sale = await findSaleById(idSale);

    if (!sale) {
        res.status(404).json({ message: 'Sale not fount' });
        return;
    }

    if (sale.quotations.length === 0) {
        res.status(404).json({ message: 'Sale hasn\'t quotations ' });
        return;
    }

    if (!validateQuotation(sale.quotations)) {
        res.status(400).json({ message: 'It\'s no posible to accept quotation' });
        return;
    }

    const accepetedSale: Sale = acceptQuotation(sale);
    const updatedSale: Sale = await updateSaleByID(accepetedSale._id, accepetedSale);

    if (!updatedSale) {
        res.status(400).json({ message: 'It\'s no posible to save new Sale' });
        return;
    }

    res.status(200).json({ updatedSale });
};
