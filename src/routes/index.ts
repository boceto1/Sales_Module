import {Application } from 'express';
import {serviceRoute} from './service.routes';

export const setRoutes = (app: Application ): Application => {
    app.use('/services', serviceRoute);
    return app;
};
