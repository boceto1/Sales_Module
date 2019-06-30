import express from 'express';
import {setUpExpress} from './app';
import * as CONST from './const';
const {PORT} = CONST;

export const app: express.Express = express();

app.listen(PORT, () => {
    console.log(`Running in the port: ${PORT}`);
});

setUpExpress(app);