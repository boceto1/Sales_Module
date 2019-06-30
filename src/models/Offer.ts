import { Schema} from 'mongoose';
import { offerServiceSchema } from './Service';

export const offerSchema = new Schema({
    services: [offerServiceSchema]
});
