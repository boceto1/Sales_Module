import {  model, Schema} from 'mongoose';

const meetingSchema = new Schema({
    topic: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    assistants: {type: [String], required: true},
    duration: {type: Number, required: true},
    place: {type: String, required: true},
    observation: {type: String, required: true},
});

export const MEETING = model('Meeting', meetingSchema);