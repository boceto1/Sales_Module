import bodyParser from 'body-parser';
import { Application } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import R from 'ramda';

import {MONGO_URI} from './const';

import api from './routes';

export function setUpExpress(app: Application) {
    setUpMongo();
    setConfigurations(app);
    return app;
}

const setMiddlewares = (app: Application): Application => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    return app;
};

const setRoutes = (app: Application): Application =>{
    app.use(api);
    return app;
};

const setConfigurations = R.pipe(setMiddlewares, setRoutes);

const setUpMongo = (): void => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });
};
