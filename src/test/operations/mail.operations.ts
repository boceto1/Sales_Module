import { createMailCtrl } from '../../operations/Util/mail.operation' 
import { Mail } from '../../types/types';

describe.only('Create email ', () => {
    describe('Create email', () => {
    const email : Mail = {
        from: 'ventasarquitectura2019@gmail.com',
        to: 'janka.obando@gmail.com',
        subject : 'Test',
        html: '<h1>Test 1 1</h1>'
    }
        it('email sends correctly', () => {
            createMailCtrl(email);
        });
    });

});