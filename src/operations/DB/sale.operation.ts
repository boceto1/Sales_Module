import { ObjectId } from 'bson';
import { SALE } from '../../models/Sale';
import { Sale } from '../../types/types';

export const createSale = async (idSeller: string, sale: Sale): Promise<any> => {
    sale.idSeller = idSeller;
    const createdSale = new SALE(sale);
    const resposeCreatedSale = await createdSale.save();
    return resposeCreatedSale;
};

export const findSaleById = async (id: ObjectId): Promise<any> => SALE.findById(id);

export const findSalesBySeller = async (idSeller): Promise<any> => SALE.find({ idSeller });

export const findSalesByPhase = async (seller: String, phaseS: string): Promise<any> => SALE.find({ idSeller: seller, phase: phaseS });

export const deleteSaleById = async (id: ObjectId): Promise<any> => SALE.findByIdAndDelete(id);

export const updateSale = async (sale: Sale): Promise<any> => {
    const updateSale = new SALE(sale);
    const responseUpdatedSale = await updateSale.save();
    return responseUpdatedSale;
};

export const updateSaleByID = async (id: ObjectId, updatedSale: Sale): Promise<any> =>
    SALE.findByIdAndUpdate(id, updatedSale, { new: true });
