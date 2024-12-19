import { Service } from "./service.interface";

export interface ClientName {
    id: number;
    name: string;
}

export interface ClientBase {
    name: string;
    phone: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
}

export interface ClientCreate extends ClientBase {
    birthdate: Date;
}

export interface Client extends ClientCreate {
    id: number;
}

export interface ClientSimple extends ClientBase {
    id: number;
    birthdate: String | null;
}

export interface ClientRepository {
    create(data: ClientCreate): Promise<Client>;
    findByName(name: string): Promise<Client | null>;
    findById(id: number): Promise<Client | null>;
    findNames(): Promise<ClientName[] | null>;
    findAllClients(): Promise<ClientBase[]>;
    updateClient(data: Client): Promise<Client>;
    deleteClient(id: number): Promise<Boolean>;
}
