import { Router } from 'express';
import { createQuotationCtrl, getQuotationsBySaleCtrl, getSaleQuotationById } from '../controller/quotation.controller';
import { createServiceCtrl,
         deleteSaleByIdCtrl,
         getSaleByIdCtrl,
         getSalesBySellerCtrl,
} from '../controller/sale.controller';

const apiSale: Router = Router();

apiSale.route('/:idSale')
            .get(getSaleByIdCtrl)
            .delete(deleteSaleByIdCtrl);

apiSale.route('/:idSale/quotations')
            .get(getQuotationsBySaleCtrl)
            .post(createQuotationCtrl);

apiSale.route('/:idSale/quotations/:idQuotation')
            .get(getSaleQuotationById);

apiSale.route('/seller/:idSeller')
            .get(getSalesBySellerCtrl)
            .post(createServiceCtrl);

export const saleRoute = apiSale;
