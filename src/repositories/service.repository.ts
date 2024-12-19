import {
    ServiceAnalogic,
    ServiceCreate,
    ServiceRepository,
    Service,
    ServiceName,
} from "../interfaces/service.interface";
import { prisma } from "../database/prismaClient";
import { minutesToTime } from "../conversion/minutesToTime";

class ServiceRepositoryPrisma implements ServiceRepository {
    async create(data: ServiceCreate): Promise<Service> {
        const result = await prisma.service.create({
            data: {
                description: data.description,
                duration: data.duration,
                name: data.name,
                price: data.price,
            },
        });

        return result;
    }

    async findByName(name: string): Promise<Service | null> {
        const result = await prisma.service.findFirst({
            where: {
                name,
            },
        });

        return result || null;
    }

    async findById(id: number): Promise<Service | null> {
        const result = await prisma.service.findUnique({
            where: {
                id,
            },
        });

        return result || null;
    }

    async findNames(): Promise<ServiceName[]> {
        const result = await prisma.service.findMany();

        const formattedResult = result.map((service) => ({
            id: service.id,
            name: service.name,
        }));

        return formattedResult;
    }

    async findAllServices(): Promise<ServiceAnalogic[]> {
        const result = await prisma.service.findMany();

        const formattedResult = result.map((service) => ({
            ...service,
            duration: minutesToTime(service.duration),
        }));

        return formattedResult;
    }

    async updateService(data: Service): Promise<Service> {
        const { description, duration, id, name, price } = data;
        const result = await prisma.service.update({
            where: {
                id,
            },
            data: {
                description,
                duration,
                id,
                name,
                price,
            },
        });

        return result;
    }

    async deleteService(id: number): Promise<Boolean> {
        const result = await prisma.service.delete({
            where: {
                id,
            },
        });

        return result ? true : false;
    }
}

export { ServiceRepositoryPrisma };
