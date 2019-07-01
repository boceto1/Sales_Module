import { ObjectId } from 'bson';
import { MEETING } from '../../models/Meeting';
import {  Meeting } from '../../types/types';

export const createMeeting = async (meeting: Meeting): Promise<any> => {
        const createdMeeting = new MEETING(meeting);
        const resposeCreatedMeeting = await createdMeeting.save();
        return resposeCreatedMeeting;
};

export const findMeetingById = async (id: ObjectId): Promise<any> => MEETING.findById(id);

export const getAllMeetings = async (): Promise<any> => MEETING.find();

export const updateMeetingById = async (id: ObjectId, meeting: Meeting): Promise<any> =>
                                MEETING.findByIdAndUpdate(id, meeting, {new: true});

export const deleteMeetingById = async (id: ObjectId): Promise<any> =>
                                MEETING.findByIdAndDelete(id);
