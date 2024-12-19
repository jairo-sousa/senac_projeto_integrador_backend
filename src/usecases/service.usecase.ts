import { Service, ServiceCreate } from "../interfaces/service.interface";
import { ServiceRepositoryPrisma } from "../repositories/service.repository";

class ServiceUseCase {
    private serviceRepository: ServiceRepositoryPrisma;

    constructor() {
        this.serviceRepository = new ServiceRepositoryPrisma();
    }

    async create(service: ServiceCreate): Promise<Service> {
        const { description, duration, name, price } = service;

        const verifyIfServiceExists = await this.serviceRepository.findByName(
            name
        );

        if (verifyIfServiceExists) {
            throw new Error("[service] - Service already exists");
        }

        const result = await this.serviceRepository.create({
            description,
            duration,
            name,
            price,
        });

        return result;
    }

    async findNames() {
        const services = await this.serviceRepository.findNames();

        return services;
    }

    async findAllServices() {
        const services = await this.serviceRepository.findAllServices();

        return services;
    }

    async findById(id: number) {
        const services = await this.serviceRepository.findById(id);

        return services;
    }

    async updateService(service: Service) {
        const { description, duration, id, name, price } = service;

        const data = await this.serviceRepository.updateService(service);

        return data;
    }

    async deleteService(id: number) {
        const data = await this.serviceRepository.deleteService(id);

        return data;
    }
}

export { ServiceUseCase };
