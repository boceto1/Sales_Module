import {  model, Schema} from 'mongoose';
import { discountSchema } from './Discount';
import { offerSchema as Offer, quotationSchema as Quotation } from './Quotation';

const contractSchema = new Schema({
    idCompany: {type: String, required: true},
    description: {type: String, required: true},
    offer: Offer,
    creationDate: {type: Date, default: Date.now()},
    discounts: [{type: discountSchema, default: []}],
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
    contract: {type: contractSchema},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task', default: []}],
    meetings: [{type: Schema.Types.ObjectId, ref: 'Meeting', default: []}],
    communications: [{type: Schema.Types.ObjectId, ref: 'Communication', default: []}],
    subtotal: Number,
    total: Number,
});

export const SALE = model('Sale', saleSchema);
