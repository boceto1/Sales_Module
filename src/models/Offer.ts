import {  model, Schema} from 'mongoose';

const serviceSchema = new Schema({
    idService: Number,
    description : String,
    amount : Number,
    unitValue: Number,
    totalValue: Number
});

export const SERVICE = model('Service', serviceSchema);

const offerSchema = new Schema({
    services: [serviceSchema]
});

export const OFFER = model('Offer', offerSchema);
