import { Router } from 'express';
import { createServiceCtrl,
    deleteServiceByIdCtrl,
    findAllServicesCtrl,
    findServiceByIdCtrl,
    updateServiceByIdCtrl
} from '../controller/service.controller';

const apiService: Router = Router();

apiService.route('')
            .get(findAllServicesCtrl)
            .post(createServiceCtrl);

apiService.route('/:id')
            .get(findServiceByIdCtrl)
            .put(updateServiceByIdCtrl)
            .delete(deleteServiceByIdCtrl);

export const serviceRoute = apiService;
