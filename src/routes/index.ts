import {Application } from 'express';
import {saleRoute} from './sale.routes';
import {serviceRoute} from './service.routes';

export const setRoutes = (app: Application ): Application => {
    app.use('/services', serviceRoute);
    app.use('/sales', saleRoute);
    return app;
};
