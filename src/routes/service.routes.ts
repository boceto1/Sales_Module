import { Router } from 'express';
import { createServiceCtrl } from '../controller/service.controller';

const apiService: Router = Router();

apiService.route('')
            .post(createServiceCtrl);

export const serviceRoute = apiService;
