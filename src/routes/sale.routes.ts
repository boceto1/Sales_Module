import { Router } from 'express';
import { createCommunicationBySale, getCommunicationsBySale } from '../controller/communication.controller';
import { createMeetingBySale, getMeetingsBySale } from '../controller/meeting.controller';
import {
    acceptQuotationCtrl,
    createQuotationCtrl,
    getQuotationsBySaleCtrl,
    getSaleQuotationById
} from '../controller/quotation.controller';
import {
    createServiceCtrl,
    deleteSaleByIdCtrl,
    getSaleByIdCtrl,
    getSalesBySellerCtrl,
    getSalesByPhaseCtrl,
} from '../controller/sale.controller';
import { createTaskBySale, getTasksBySale } from '../controller/task.controller';

const apiSale: Router = Router();

apiSale.route('/:idSale')
    .get(getSaleByIdCtrl)
    .delete(deleteSaleByIdCtrl);

apiSale.route('/:idSale/quotations')
    .get(getQuotationsBySaleCtrl)
    .post(createQuotationCtrl);

apiSale.route('/:idSale/quotations/:idQuotation')
    .get(getSaleQuotationById);

apiSale.route('/:idSale/acceptedQuotation')
    .put(acceptQuotationCtrl);

apiSale.route('/seller/:idSeller')
    .get(getSalesBySellerCtrl)
    .post(createServiceCtrl); // cambiar a otro endpoin que tenga un Crud de Servicios.

apiSale.route('/seller/:idSeller/:phase')
    .get(getSalesByPhaseCtrl)

apiSale.route('/:idSale/tasks')
    .get(getTasksBySale)
    .post(createTaskBySale);

apiSale.route('/:idSale/meetings')
    .get(getMeetingsBySale)
    .post(createMeetingBySale);

apiSale.route('/:idSale/communications')
    .get(getCommunicationsBySale)
    .post(createCommunicationBySale);

export const saleRoute = apiSale;
