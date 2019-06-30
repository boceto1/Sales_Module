import { Router } from 'express';
import { createServiceCtrl,
         getSaleByIdCtrl,
         getSalesBySellerCtrl
} from '../controller/sale.controller';

const apiSale: Router = Router();

apiSale.route('/:id')
            .get(getSaleByIdCtrl)
            .delete();

apiSale.route('/seller/:idSeller')
            .get(getSalesBySellerCtrl)
            .post(createServiceCtrl);

export const saleRoute = apiSale;
