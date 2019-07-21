import { createMailCtrl } from '../../operations/Util/mail.operation'
import { generateHTML } from '../../operations/Util/pdfgeneration.operations'

import { Mail, Company } from '../../types/types';
import { Quotation } from '../../types/types';
import { Offer } from '../../types/types';
import { OfferService } from '../../types/types';

describe('Create email ', () => {
    describe('Create email', () => {
        const email: Mail = {
            from: 'ventasarquitectura2019@gmail.com',
            to: 'janka.obando@gmail.com',
            subject: 'Test',
            html: '<h1>Test 1 1</h1>',
            attachments: 'C:/Users/crist/Documents/EjemploKarlita.pdf',
        }
        it('email sends correctly', () => {
            createMailCtrl(email);
        });
    });

});

describe.only('Create email ', () => {
    describe('Create email', () => {
        it('email sends correctly', () => {
            const offerService: OfferService = {
                idService: 0,
                description: 'des',
                unitValue: 0,
                amount: 10,
                totalValue: 10
            }
            const offerService1: OfferService = {
                idService: 1,
                description: 'des',
                unitValue: 0,
                amount: 10,
                totalValue: 10
            }
            const offer: Offer = {
                services: [offerService, offerService1, offerService1, offerService1],
                total: 10
            }
            const offer2: Offer = {
                services: [offerService, offerService1, offerService1, offerService1],
                total: 10
            }
            const offer3: Offer = {
                services: [offerService, offerService1, offerService1, offerService1],
                total: 10
            }
            const offer4: Offer = {
                services: [offerService, offerService1, offerService1, offerService1],
                total: 10
            }
            const offer1: Offer = {
                services: [offerService, offerService1],
                total: 20
            }
            const quotation: Quotation = {
                idCompany: 1,
                description: 'Ejemplo',
                creationDate: new Date(),
                isValid: true,
                offers: [
                    offer, offer1, offer2, offer3, offer4
                ]
            }
            const company: Company[] = [{
                name: "empresa",
                ruc: "1710414184001",
                address: 'Sangolqui',
                mail: "cudiaza@gmail.com",
                phone: "0987293631",
            },
            {
                name: "empresa1",
                ruc: "1710414185001",
                address: 'Sangolqui1',
                mail: "cudiaza1@gmail.com",
                phone: "0987293632",
            }]
            generateHTML(quotation, company);
        });
    });

});