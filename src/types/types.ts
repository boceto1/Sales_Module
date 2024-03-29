import { ObjectId } from 'bson';

interface CustomSchema {
    _id?: ObjectId;
    __v?: number;
}

export interface Sale extends CustomSchema {
    name: string;
    description: string;
    idSeller: string;
    idCompany: string;
    phase: string;
    creationDate: Date;
    modificationDate: Date;
    isClosed: boolean;
    quotations?: Quotation[];
    tasks?: ObjectId[];
    meetings?: ObjectId[];
    communications?: ObjectId[];
    contract?: Contract;
    subtotal?: number;
    total?: number;
}

export interface Contract extends CustomSchema {
    idCompany: string;
    description: string;
    offer: Offer;
    creationDate: Date;
    total: number;
    discounts?: [Discount];
}

export interface Quotation extends CustomSchema {
    idCompany: number;
    description: string;
    offers: Offer[];
    creationDate: Date;
    isValid: boolean;
}

export interface Offer extends CustomSchema {
    services: OfferService[];
    total?: number;
}

export interface Service extends CustomSchema {
    idSeller: string;
    idService: number;
    description: string;
    unitValue: number;
}

export interface OfferService extends Service, CustomSchema {
    amount: number;
    totalValue?: number;
}

export interface Discount extends CustomSchema {
    idSeller: string;
    description: string;
    percentage: number;
}

export interface Communication extends CustomSchema {
    idSale: ObjectId;
    description: string;
    date: Date;
    type: string;
    observation?: string;
    email: Mail,
    call: Call
}
export interface Call {
    phoneNumber: number,
    state: string,
};

export interface Meeting extends CustomSchema {
    idSale: ObjectId;
    topic: string;
    description: string;
    date: Date;
    assistants: string[];
    duration: number;
    place: string;
    observation?: string;
}

export interface Task extends CustomSchema {
    idSale: ObjectId;
    description: string;
    realized: boolean;
}

export interface Mail {
    from: string;
    to: string;
    subject: string;
    html: string;
    attachments: [{
        filename: string;
        path: string;
        contentType: string;
    }],
}
export interface Company {
    name: string;
    ruc: string;
    address: string;
    phone: string;
    mail: string;
}