import { Router } from 'express';
import { createCommunicationBySale, getCommunicationsBySale } from '../controller/communication.controller';
import { createMeetingBySale, getMeetingsBySale } from '../controller/meeting.controller';
import {
    acceptQuotationCtrl,
    createQuotationCtrl,
    getQuotationsBySaleCtrl,
    getSaleQuotationById } from '../controller/quotation.controller';

import { closeSale,
         createServiceCtrl,
         deleteSaleByIdCtrl,
         getSaleByIdCtrl,
         getSalesBySellerCtrl,
         cancelSale,
} from '../controller/sale.controller';

import { addDiscountToContract } from '../controller/contract.controller';
import { createTaskBySale, getTasksBySale } from '../controller/task.controller';

const apiSale: Router = Router();

apiSale.route('/:idSale')
            .get(getSaleByIdCtrl)
            .delete(deleteSaleByIdCtrl)
            .put(closeSale);

apiSale.route('/:idSale/canceled')
            .put(cancelSale);

apiSale.route('/:idSale/quotations')
            .get(getQuotationsBySaleCtrl)
            .post(createQuotationCtrl);

apiSale.route('/:idSale/quotations/:idQuotation')
            .get(getSaleQuotationById);

apiSale.route('/:idSale/acceptedQuotation')
            .put(acceptQuotationCtrl);

apiSale.route('/:idSale/contract')
            .post(addDiscountToContract);

apiSale.route('/seller/:idSeller')
            .get(getSalesBySellerCtrl)
            .post(createServiceCtrl);

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
