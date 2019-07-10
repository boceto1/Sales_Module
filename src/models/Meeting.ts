import { ObjectId } from 'bson';
import {  model, Schema} from 'mongoose';

const meetingSchema = new Schema({
    idSale: { type: ObjectId, required: true},
    topic: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    assistants: {type: [String], required: true},
    duration: {type: Number, required: true},
    place: {type: String, required: true},
    observation: {type: String},
});

export const MEETING = model('Meeting', meetingSchema);
