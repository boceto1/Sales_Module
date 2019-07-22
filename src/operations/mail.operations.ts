import {
    generateHTML,
} from '../operations/Util/pdfgeneration.operations';
import { Company, Quotation, Mail, Sale, Communication, Call } from '../types/types';
import { ObjectId } from 'bson';
import {
    createCommunication,
} from '../operations/DB/communication.operation';
import { findSaleById, updateSaleByID } from '../operations/DB/sale.operation';

export const createPDF = async (quotation: Quotation, company: Company[], quotations: Quotation): Promise<Mail> => {
    const emailE: string = company[1].mail;
    const email: Mail = {
        from: "",
        to: emailE,
        subject: 'Cotizacion',
        html: '<h1>Envio la cotizacion adjunta, espero su respuesta</h1>',
        attachments: [{
            filename: 'cotizacion.pdf',
            path: 'G:/ARQUITECTURA/3er Parcial/Sales_Module/tmp/cotizacion.pdf',
            contentType: 'application/pdf'
        }],
    }
    await generateHTML(quotation, company, quotations, email);
    return email;
};

export const createCommunicationMail = async (id: ObjectId, mail: Mail, res) => {
    const idSale: ObjectId = id;
    const call: Call = {
        phoneNumber: 0,
        state: "",
    }
    const communication: Communication = {
        idSale: idSale,
        description: mail.html,
        date: new Date(),
        email: mail,
        type: "mail",
        observation: mail.attachments[0].filename,
        call: call,
    };
    console.log(communication);
    try {
        console.log("entro");
        const foundSale: Sale = await findSaleById(idSale);
        if (!foundSale) {
            res.status(404).json({ message: 'Sale not found' });
            return;
        }
        communication.idSale = foundSale._id;
        const newCommunication = await createCommunication(communication);

        foundSale.communications.push(newCommunication.id);
        const updatedSale = await updateSaleByID(foundSale._id, foundSale);

        res.status(200).json({ updatedSale });
    } catch (error) {
        res.status(500).json({ message: 'Problem to find Sale', error });
    }
};