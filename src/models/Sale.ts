import mongoose from 'mongoose';
import Schema = mongoose.Schema;
const valiedPhase = {
    values:[
        'Habilitado para la venta',
        'Negociación de oferta',
        'Acuerdo de pagos y descuentos',
        'Listo para cerrar',
        'Cerrado'
        ],
    message: 'is not a valid Phase'
};

const saleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    idSeller: {type: String, required: true},
    idCompany:{type: String, required: true},
    phase: {default: 'Habilitado para la venta', enum: valiedPhase},
    creationDate: {type: Date, default: Date.now()},
    modificationDate:{type: Date, default: Date.now()},
    isClosed:{type: Boolean, default: false}
    });

module.exports = mongoose.model('Sale', saleSchema);