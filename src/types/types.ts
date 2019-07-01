import { ObjectId } from "bson";

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
    creationDate: string;
    modificationDate: string;
    isClosed: boolean;
    quotations?: Quotation[];
    tasks?: Task[];
    meetings?: Meeting[];
    communications?: Communication[];
    contract?: Contract;
}

export interface Contract extends CustomSchema {
    idCompany: string;
    description: string;
    offers: Offer[];
    creationDate: Date;
    total: boolean;
}

export interface Quotation extends CustomSchema{
    idCompany: number;
    description: string;
    offers: Offer [];
    creationDate: Date;
    isValid: boolean;
}

export interface Offer extends CustomSchema{
    services: OfferService[];
    total?: number;
}

export interface Service extends CustomSchema{
    idService: number;
    description: string;
    unitValue: number;
}

export interface OfferService extends Service,CustomSchema {
    amount: number;
    totalValue?: number;
}

export interface Discount extends CustomSchema{
    idDiscount: number;
    description: string;
    percentage: number;
}

export interface Communication extends CustomSchema {
    description: string;
    subjet: string;
    phoneNumber: string;
    date: Date;
    email: string;
    type: string;
    observation: string;
    state: string;
}

export interface Meeting extends CustomSchema {
    topic: string;
    description: string;
    date: Date;
    assistants: string [];
    duration: number;
    place: string;
    observation: string;
}

export interface Task extends CustomSchema {
    description: string;
    realizado: boolean;
}
