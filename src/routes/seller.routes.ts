import { Router } from 'express';
import { deleteDiscountCtrl,
        getDiscountByIdCrlt,
        getDiscountsCrlt,
        postDiscountsCrlt,
        putDiscountCtlr,
    } from '../controller/discounts.controller';

import {
    createServiceCtrl,
    getServiceBySeller
} from '../controller/service.controller';

const apiSeller: Router = Router();

apiSeller.route('/:idSeller/discounts')
            .post(postDiscountsCrlt)
            .get(getDiscountsCrlt);

apiSeller.route('/:idSeller/discounts/:id')
            .get(getDiscountByIdCrlt)
            .put(putDiscountCtlr)
            .delete(deleteDiscountCtrl);

apiSeller.route('/:idSeller/services/')
            .post(createServiceCtrl)
            .get(getServiceBySeller);

export const sellerRoute = apiSeller;
