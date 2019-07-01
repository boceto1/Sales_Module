import { Router } from 'express';
import { createTaskCtrl,
    deleteTaskByIdCtrl,
    findAllTasksCtrl,
    findTaskByIdCtrl,
    updateTaskByIdCtrl
} from '../controller/task.controller';

const apiTask: Router = Router();

apiTask.route('')
            .get(findAllTasksCtrl)
            .post(createTaskCtrl);

apiTask.route('/:id')
            .get(findTaskByIdCtrl)
            .put(updateTaskByIdCtrl)
            .delete(deleteTaskByIdCtrl);

export const taskRoute = apiTask;
