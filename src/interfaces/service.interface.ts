export interface ServiceName {
    id: number;
    name: string;
}
export interface ServiceBase {
    name: string;
    description: string;
    price: number;
}

export interface ServiceCreate extends ServiceBase {
    duration: number;
}

export interface Service extends ServiceCreate {
    id: number;
}

export interface ServiceAnalogic extends ServiceBase {
    id: number;
    duration: string;
}

export interface ServiceRepository {
    create(data: Service): Promise<Service>;
    findByName(name: string): Promise<Service | null>;
    findById(id: number): Promise<Service | null>;
    findNames(): Promise<ServiceName[]>;
    findAllServices(): Promise<ServiceAnalogic[]>;
    updateService(data: Service): Promise<Service>;
    deleteService(id: number): Promise<Boolean>;
}
