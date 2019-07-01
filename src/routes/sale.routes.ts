import { Router } from 'express';
import { createQuotationCtrl } from '../controller/quotation.controller';
import { createServiceCtrl,
         deleteSaleByIdCtrl,
         getSaleByIdCtrl,
         getSalesBySellerCtrl,
} from '../controller/sale.controller';

const apiSale: Router = Router();

apiSale.route('/:idSale')
            .get(getSaleByIdCtrl)
            .delete(deleteSaleByIdCtrl);

apiSale.route('/:idSale/quotation')
            .post(createQuotationCtrl);

apiSale.route('/seller/:idSeller')
            .get(getSalesBySellerCtrl)
            .post(createServiceCtrl);

export const saleRoute = apiSale;
