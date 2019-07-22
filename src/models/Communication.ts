import { ObjectId } from 'bson';
import { model, Schema } from 'mongoose';

const emailSchema = new Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    html: { type: String, required: true },
    attachment:
        [{
            filename: { type: String },
            path: { type: String},
            contentType: { type: String},
        }],
});

const callSchema = new Schema({
    phoneNumber: { type: Number},
    state: { type: String },

});

const communicationSchema = new Schema({
    idSale: { type: ObjectId, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    observation: { type: String },
    email: { type: emailSchema },
    callSchema: { type: callSchema }
});

export const COMMUNICATION = model('Communication', communicationSchema);
