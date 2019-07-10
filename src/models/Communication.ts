import { ObjectId } from 'bson';
import {  model, Schema} from 'mongoose';

const communicationSchema = new Schema({
    idSale: { type: ObjectId, required: true},
    description: {type: String, required: true},
    subjet: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    date: {type: Date, required: true},
    email: {type: String, required: true},
    type: {type: String, required: true},
    observation: {type: String, required: true},
    state: {type: String, required: true},
});

export const COMMUNICATION = model('Communication', communicationSchema);
