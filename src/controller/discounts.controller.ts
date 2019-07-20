import { Request, Response } from 'express';
import { createDiscount ,
        deleteDiscountById,
        findDiscountBySeller,
        findDiscountsBySeller,
        updateDiscountById} from '../operations/DB/discounts.operations';

export const getDiscountsCrlt = async (req: Request, res: Response) => {

    const idSeller = req.params.idSeller;

    try {
        const foundDiscounts  = await findDiscountsBySeller(idSeller);
        if (foundDiscounts.length === 0 ) {
            res.status(404).json({error: 'Discounts not found' });
        }
        res.status(200).json({discounts: foundDiscounts});
    } catch (error) {
        res.status(400).json({error});
    }

};

export const postDiscountsCrlt = async (req: Request, res: Response) => {
    const idSeller = req.params.idSeller;
    const discount = req.body.discount;

    discount.idSeller = idSeller;

    try {
        const createdDiscount = await createDiscount(discount);
        res.status(201).json({createdDiscount});
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getDiscountByIdCrlt = async (req: Request, res: Response) => {
    const idSeller = req.params.idSeller;
    const idDiscount = req.params.id;

    try {
        const discount = await findDiscountBySeller(idSeller, idDiscount);

        if (!discount) {
            res.status(404).json({error: 'Discount not Found'});
        }
        res.status(200).json({discount});
    } catch (error) {
        res.status(400).json({error});
    }
};

export const putDiscountCtlr = async (req: Request, res: Response) => {
    const idSeller = req.params.idSeller;
    const idDiscount = req.params.id;
    const newPercentage = req.body.percentage;

    try {
        const discount = await findDiscountBySeller(idSeller, idDiscount);

        if (!discount) {
            res.status(404).json({error: 'Discount not Found'});
        }

        discount.percentage = newPercentage;

        const updatedDiscount = await updateDiscountById(discount.id, discount);

        if (!updatedDiscount) {
            res.status(500).json({error: 'Error to update discount'});
        }

        res.status(200).json({updatedDiscount});
    } catch (error) {
        res.status(400).json(error);
    }
};

export const deleteDiscountCtrl =  async (req: Request, res: Response) => {

    const idSeller = req.params.idSeller;
    const idDiscount = req.params.id;

    try {
        const discount = await findDiscountBySeller(idSeller, idDiscount);

        if (!discount) {
            res.status(404).json({error: 'Discount not Found'});
        }

        const deletedDiscount = await deleteDiscountById(discount.id);

        if (!deletedDiscount) {
            res.status(500).json({error: 'Error to update discount'});
        }

        res.status(200).json({deletedDiscount});
    } catch (error) {
        res.status(400).json(error);
    }
};
