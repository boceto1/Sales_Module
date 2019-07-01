import {  model, Schema} from 'mongoose';

const taskSchema = new Schema({
    description : {type: String, required: true},
    realized : {type: Boolean, required: true},
});

export const TASK = model('Task', taskSchema);