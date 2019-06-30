import {  model, Schema} from 'mongoose';

const serviceSchema = new Schema({
    idService: {type: Number, unique: true, required: true},
    description : {type: Number, required: true},
    unitValue: {type: Number, required: true},
});

export const offerServiceSchema = serviceSchema.clone();
offerServiceSchema.add({ amount : Number, totalValue: Number });

export const SERVICE = model('Service', serviceSchema);