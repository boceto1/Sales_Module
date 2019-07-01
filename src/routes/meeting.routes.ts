import { Router } from 'express';
import { createMeetingCtrl,
    deleteMeetingByIdCtrl,
    findAllMeetingsCtrl,
    findMeetingByIdCtrl,
    updateMeetingByIdCtrl
} from '../controller/meeting.controller';

const apiMeeting: Router = Router();

apiMeeting.route('')
            .get(findAllMeetingsCtrl)
            .post(createMeetingCtrl);

apiMeeting.route('/:id')
            .get(findMeetingByIdCtrl)
            .put(updateMeetingByIdCtrl)
            .delete(deleteMeetingByIdCtrl);

export const meetingRoute = apiMeeting;
