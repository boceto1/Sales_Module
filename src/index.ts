import express from 'express';
import {setUpExpress} from './app';
import * as CONST from './const';
const {PORT} = CONST;
import path from 'path';

export const app: express.Express = express();

console.log(path.join(__dirname,'tmp', 'cotizacion.pdf'));

app.listen(PORT, () => {
    console.log(`Running in the port: ${PORT}`);
});

setUpExpress(app);