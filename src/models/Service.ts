import {  model, Schema} from 'mongoose';

const serviceSchema = new Schema({
    idService: {type: Number, unique: true, required: true, index: true, sparse:true},
    description : {type: String, required: true},
    unitValue: {type: Number, required: true},
});

export const offerServiceSchema = new Schema({
    idService:{ type: Schema.Types.ObjectId, ref: 'Service', required: true},
    amount : {type: Number, required: true },
    totalValue: {type: Number, required: true},
});

export const SERVICE = model('Service', serviceSchema);
