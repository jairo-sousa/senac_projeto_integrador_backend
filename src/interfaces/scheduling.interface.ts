export interface SchedulingService {
    services: {
        id: number;
        name: string;
        description: string;
        duration: number;
        price: number;
    }[];
    id: number;
    date: Date;
    status: string;
    clientId: number;
}

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
    findById(id: number): Promise<SchedulingService | null>;
    findAllSchedulings(date: Date): Promise<SchedulingFull[]>;
    updateScheduling(data: Scheduling): Promise<Scheduling>;
    deleteScheduling(id: number): Promise<Boolean>;
}
