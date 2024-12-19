import { Client } from "./client.interface";

export interface SchedulingBase {
    date: Date;
    status: string;
    services?: number[];
}

export interface Scheduling extends SchedulingBase {
    id: number;
    clientName?: string;
}

export interface SchedulingCreate extends SchedulingBase {
    clientName: string;
}

export interface SchedulingCreateData extends SchedulingBase {
    clientId: number;
}

export interface SchedulingFull {
    date: Date;
    status: string;
    services: string[];
    client: string;
}

export interface SchedulingRepository {
    create(data: SchedulingCreateData): Promise<Scheduling>;
    findById(id: number): Promise<Scheduling | null>;
    findAllSchedulings(date: Date): Promise<SchedulingFull[]>;
    updateScheduling(data: Scheduling): Promise<Scheduling>;
    deleteScheduling(id: number): Promise<Boolean>;
}
