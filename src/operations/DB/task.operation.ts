import { ObjectId } from 'bson';
import { TASK } from '../../models/Task';
import {  Task } from '../../types/types';

export const createTask = async (task: Task): Promise<any> => {
        const createdTask = new TASK(task);
        const resposeCreatedTask = await createdTask.save();
        return resposeCreatedTask;
};

export const findTaskById = async (id: ObjectId): Promise<any> => TASK.findById(id);

export const getAllTasks = async (): Promise<any> => TASK.find();

export const updateTaskById = async (id: ObjectId, task: Task): Promise<any> =>
                                                TASK.findByIdAndUpdate(id, task, {new: true});

export const deleteTaskById = async (id: ObjectId): Promise<any> =>
                                                TASK.findByIdAndDelete(id);

export const getAllTasksBySale = async (idSale: ObjectId): Promise<any> => TASK.find({idSale});
