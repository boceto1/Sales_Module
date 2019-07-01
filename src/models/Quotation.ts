import { Schema} from 'mongoose';
import { offerServiceSchema as OfferService } from './Service';

const offerSchema = new Schema({
    services: [OfferService],
    total: Number,
});

export const quotationSchema = new Schema ({
    idCompany: {type: String, required: true},
    description: {type: String},
    offers: {type: [offerSchema], required: true},
    creationDate: {type: Date, default: Date.now()},
    total: {type: Number, required: true},
    isValid: {type: Boolean, default: true},
});
