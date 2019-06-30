import { Router } from 'express';
import { createServiceCtrl,
         deleteSaleByIdCtrl,
         getSaleByIdCtrl,
         getSalesBySellerCtrl,
} from '../controller/sale.controller';

const apiSale: Router = Router();

apiSale.route('/:id')
            .get(getSaleByIdCtrl)
            .delete(deleteSaleByIdCtrl);

apiSale.route('/seller/:idSeller')
            .get(getSalesBySellerCtrl)
            .post(createServiceCtrl);

apiSale.route('/:id/seller/:idSeller');

export const saleRoute = apiSale;
