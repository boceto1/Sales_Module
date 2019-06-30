import {  model, Schema} from 'mongoose';

const saleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    idSeller: {type: String, required: true},
    idCompany: {type: String, required: true},
    phase: { type: String, default: 'Habilitado para la venta'},
    creationDate: {type: Date, default: Date.now()},
    modificationDate: {type: Date, default: Date.now()},
    isClosed: { type: Boolean, default: false}
    });

export const SALE = model('Sale', saleSchema);
