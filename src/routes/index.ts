import {Application } from 'express';
import {communicationRoute} from './communication.routes';
import {meetingRoute} from './meeting.routes';
import {saleRoute} from './sale.routes';
import {serviceRoute} from './service.routes';
import {taskRoute} from './task.routes';
//email route


export const setRoutes = (app: Application ): Application => {
    app.use('/services', serviceRoute);
    app.use('/sales', saleRoute);
    app.use('/tasks', taskRoute);
    app.use('/communications', communicationRoute);
    app.use('/meetings', meetingRoute);
    return app;
};
