import { ObjectId } from 'bson';
import {  model, Schema} from 'mongoose';

const taskSchema = new Schema({
    idSale: {type: ObjectId, required: true},
    description : {type: String, required: true},
    realized : {type: Boolean, default: false},
});

export const TASK = model('Task', taskSchema);
