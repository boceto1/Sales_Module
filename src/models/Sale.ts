import {  model, Schema} from 'mongoose';
import { quotationSchema as Quotation, offerSchema as Offer } from './Quotation';

const contractSchema = new Schema({
    idCompany: {type: String, required: true},
    description: {type: String, required: true},
    offer: Offer,
    creationDate: {type: Date, default: Date.now()},
    total: {type: Number, required: true}
});

const saleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    idSeller: {type: String, required: true},
    idCompany: {type: String, required: true},
    phase: { type: String, default: 'Habilitado para la venta'},
    creationDate: {type: Date, default: Date.now()},
    modificationDate: {type: Date, default: Date.now()},
    isClosed: { type: Boolean, default: false},
    quotations: {type: [Quotation] , default: []},
    contract: {type: contractSchema}
    });

export const SALE = model('Sale', saleSchema);
