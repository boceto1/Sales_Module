import { Router } from 'express';
import { createCommunicationCtrl,
    deleteCommunicationByIdCtrl,
    findAllCommunicationsCtrl,
    findCommunicationByIdCtrl,
    updateCommunicationByIdCtrl,
} from '../controller/communication.controller';

const apiCommunication: Router = Router();

apiCommunication.route('/:type')
            .get(findAllCommunicationsCtrl)

apiCommunication.route('')
            .post(createCommunicationCtrl);

apiCommunication.route('/:id')
            .get(findCommunicationByIdCtrl)
            .put(updateCommunicationByIdCtrl)
            .delete(deleteCommunicationByIdCtrl);

export const communicationRoute = apiCommunication;
