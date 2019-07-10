import { ObjectId } from 'bson';
import {Request, Response} from 'express';
import {createTask,
    deleteTaskById,
    findTaskById,
    getAllTasks,
    getAllTasksBySale,
    updateTaskById
} from '../operations/DB/task.operation';

import { findSaleById, updateSaleByID } from '../operations/DB/sale.operation';

import { Sale, Task } from '../types/types';

export const createTaskCtrl = async (req: Request, res: Response ) => {
    const task: Task = req.body.task;

    try {
        const createdTask = await createTask(task);
        res.status(201).json({createdTask});
    } catch (error) {
        res.status(500).json({message: 'Problem to create Task', error});
    }
};

export const findTaskByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundTask = await findTaskById(id);
        if ( !foundTask ) {
            res.status(404).json({message: 'Task not found'});
            return;
        }
        res.status(200).json({foundTask});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the task', error});
    }
};

export const findAllTasksCtrl = async (_req: Request, res: Response) => {

    try {
        const tasks = await getAllTasks();
        if ( !tasks ) {
            res.status(404).json({message: 'Tasks not found'});
            return;
        }
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the task', error});
    }
};

export const updateTaskByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    const task: Task = req.body.task;
    try {
        const updatedTask = await updateTaskById(id, task);
        if ( !updatedTask ) {
            res.status(404).json({message: 'Tasks not found'});
            return;
        }
        res.status(200).json({updatedTask});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the task', error});
    }
};

export const deleteTaskByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedTask = await deleteTaskById(id);
        if ( !deletedTask ) {
            res.status(404).json({message: 'Tasks not found'});
            return;
        }
        res.status(200).json({deletedTask});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the task', error});
    }
};

export const createTaskBySale = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;
    const task: Task = req.body.task;

    try {
        const foundSale: Sale = await findSaleById(idSale);
        if (!foundSale) {
            res.status(404).json({message: 'Sale not found'});
            return;
        }

        task.idSale = foundSale._id;
        const newTask = await createTask(task);

        foundSale.tasks.push(newTask.id);
        const updatedSale = await updateSaleByID(foundSale._id, foundSale);

        res.status(200).json({updatedSale});
    } catch (error) {
        res.status(500).json({message: 'Problem to find Sale', error});
    }
};

export const getTasksBySale = async (req: Request, res: Response) => {

    const idSale: ObjectId = req.params.idSale;

    try {
        const tasks = await getAllTasksBySale(idSale);
        if (!tasks) {
            res.status(404).json({ message: 'Tasks not found' });
            return;
        }
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find by Idt the task', error });
    }
};
