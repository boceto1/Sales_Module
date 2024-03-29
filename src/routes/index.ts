import {Application } from 'express';
import {communicationRoute} from './communication.routes';
import {meetingRoute} from './meeting.routes';
import {saleRoute} from './sale.routes';
import { sellerRoute } from './seller.routes';
import {serviceRoute} from './service.routes';
import {taskRoute} from './task.routes';

export const setRoutes = (app: Application ): Application => {
    app.use('/services', serviceRoute);
    app.use('/sales', saleRoute);
    app.use('/tasks', taskRoute);
    app.use('/communications', communicationRoute);
    app.use('/meetings', meetingRoute);
    app.use('/seller', sellerRoute);
    return app;
};
