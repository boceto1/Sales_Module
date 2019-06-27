import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

require('dotenv').config();

import api from './routes';

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.mongoSetup();
        this.setMiddlewares();
        this.setRoutes();
    }

    private setMiddlewares(): void {
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json());
        this.express.use(morgan('dev'));
    }

    private setRoutes(): void {
        this.express.use(api);
    }

    private mongoSetup(): void {
        mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}); 
    }
}

export default new App().express;
