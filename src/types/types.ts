export interface Sale {
    id: string;
    name: string;
    description: string;
    phase: string;
    creationDate: string;
    modificationDate: string;
    isClosed: boolean;
    quotations: [Quotation];
    tasks: [Task];
    meetings: [Meeting];
    communications: [Communication];
    contract: Contract;
}

export interface Contract {
    idCompany: string;
    description: string;
    offers: [Offer];
    creationDate: Date;
    total: boolean;
}

export interface Quotation {
    idCompany: number;
    description: string;
    offers: [Offer];
    creationDate: Date;
    total: boolean;
}

export interface Offer {
    services: [Service];
}

export interface Service {
    idService: number;
    description: string;
    amount: number;
    unitValue: number;
    totalValue?: number;
}

export interface Discount {
    idDiscount: number;
    description: string;
    percentage: number;
}

export interface Communication {
    description: string;
    subjet: string;
    phoneNumber: string;
    date: Date;
    email: string;
    type: string;
    observation: string;
    state: string;
}

export interface Meeting {
    topic: string;
    description: string;
    date: Date;
    assistants: [string];
    duration: number;
    place: string;
    observation: string;
}

export interface Task {
    description: string;
    realizado: boolean;
}
