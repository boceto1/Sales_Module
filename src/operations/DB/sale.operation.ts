import { ObjectId } from 'bson';
import { SALE } from '../../models/Sale';
import { Sale } from '../../types/types';

export const createSale = async (idSeller: string , sale: Sale): Promise<any> => {
    sale.idSeller = idSeller;
    const createdSale = new SALE(sale);
    const resposeCreatedSale = await createdSale.save();
    return resposeCreatedSale;
};

export const findSaleById = async (id: ObjectId) => SALE.findById(id);

export const findSalesBySeller = async (idSeller) => SALE.find({idSeller});

export const deleteSaleById = async (id: ObjectId) => SALE.findByIdAndDelete(id);
