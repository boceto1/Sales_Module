import { ObjectId } from 'bson';
import {Request, Response} from 'express';
import {createMeeting,
    deleteMeetingById,
    findMeetingById,
    getAllMeetings,
    updateMeetingById
} from '../operations/DB/meeting.operation';
import { findSaleById, updateSaleByID } from '../operations/DB/sale.operation';
import { Meeting, Sale } from '../types/types';

export const createMeetingCtrl = async (req: Request, res: Response ) => {
    const meeting: Meeting = req.body.meeting;

    try {
        const createdMeeting = await createMeeting(meeting);
        res.status(201).json({createdMeeting});
    } catch (error) {
        res.status(500).json({message: 'Problem to create Meeting', error});
    }
};

export const findMeetingByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const foundMeeting = await findMeetingById(id);
        if ( !foundMeeting ) {
            res.status(404).json({message: 'Meeting not found'});
            return;
        }
        res.status(200).json({foundMeeting});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the meeting', error});
    }
};

export const findAllMeetingsCtrl = async (_req: Request, res: Response) => {

    try {
        const meetings = await getAllMeetings();
        if ( !meetings ) {
            res.status(404).json({message: 'Meetings not found'});
            return;
        }
        res.status(200).json({meetings});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the meeting', error});
    }
};

export const updateMeetingByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    const meeting: Meeting = req.body.meeting;
    try {
        const updatedMeeting = await updateMeetingById(id, meeting);
        if ( !updatedMeeting ) {
            res.status(404).json({message: 'Meetings not found'});
            return;
        }
        res.status(200).json({updatedMeeting});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the meeting', error});
    }
};

export const deleteMeetingByIdCtrl = async (req: Request, res: Response) => {
    const id: ObjectId = req.params.id;
    try {
        const deletedMeeting = await deleteMeetingById(id);
        if ( !deletedMeeting ) {
            res.status(404).json({message: 'Meetings not found'});
            return;
        }
        res.status(200).json({deletedMeeting});
    } catch (error) {
        res.status(500).json({message: 'Problem to find by Idt the meeting', error});
    }
};

export const createMeetingBySale = async (req: Request, res: Response) => {
    const idSale: ObjectId = req.params.idSale;
    const meeting: Meeting = req.body.meeting;

    try {
        const foundSale: Sale = await findSaleById(idSale);

        if (!foundSale) {
            res.status(404).json({message: 'Sale not found'});
            return;
        }

        meeting.idSale = foundSale._id;
        const newMeeting = await createMeeting(meeting);

        foundSale.meetings.push(newMeeting.id);
        const updatedSale = await updateSaleByID(foundSale._id, foundSale);

        res.status(200).json({updatedSale});
    } catch (error) {
        res.status(500).json({message: 'Problem to find Sale', error});
    }
};
