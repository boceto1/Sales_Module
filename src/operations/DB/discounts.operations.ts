import { ObjectId } from 'bson';
import { DISCOUNT } from '../../models/Discount';
import { Discount } from '../../types/types';

export const findDiscountsBySeller = async (idSeller): Promise<any> => DISCOUNT.find({idSeller});

export const findDiscountBySeller = async (idSeller, idDiscount): Promise<any>  =>
                                     DISCOUNT.findOne({idSeller, _id: idDiscount});

export const createDiscount = async (discount: Discount): Promise<any> => {
    const createdDiscount = new DISCOUNT(discount);
    const responseCreatedDiscount = await createdDiscount.save();
    return responseCreatedDiscount;
};

export const updateDiscountById = async (id: ObjectId, discount: Discount): Promise<any> =>
                                        DISCOUNT.findByIdAndUpdate(id, discount, {new: true});
export const deleteDiscountById = async (id: ObjectId): Promise<any> =>
                                        DISCOUNT.findOneAndDelete(id);
