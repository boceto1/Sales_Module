import { model, Schema} from 'mongoose';

const discountSchema = new Schema({
    idSeller: {type: String, requiered: true},
    description: {type: String, requiered: true },
    percentage: {type: Number, requiered: true}

});

export const DISCOUNT = model('Discount', discountSchema);
