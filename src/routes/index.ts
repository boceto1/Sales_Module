import {NextFunction , Request, Response, Router } from 'express';
import {serviceRoute} from './service.routes';

const api: Router = Router();

class ApiRouter {
    router: Router = Router();

    constructor() {
        this.init();
    }

    private init(){
        this.router.get('/test', (req: Request, res: Response, nex: NextFunction) => {
            res.status(200).json({status : 'UP SERVICE'});
        });
        this.router.use('/services',serviceRoute);
    }
}

export default new ApiRouter().router;
