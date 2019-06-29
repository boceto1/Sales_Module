import exppress from 'express';
import {setUpExpress} from './app';
import {PORT} from './const'

export const app: exppress.Express = exppress();

app.listen(PORT, () => {
    console.log(`Running in the port: ${PORT}`);
});

setUpExpress(app);
