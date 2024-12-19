import { prisma } from "../database/prismaClient";
import {
    Scheduling,
    SchedulingCreateData,
    SchedulingFull,
    SchedulingRepository,
    SchedulingService,
} from "../interfaces/scheduling.interface";

function getFirstName(fullName: string): string {
    return fullName.split(" ")[0];
}

class SchedulingRepositoryPrisma implements SchedulingRepository {
    async create(data: SchedulingCreateData): Promise<Scheduling> {
        const result = await prisma.scheduling.create({
            data: {
                date: data.date,
                clientId: data.clientId,
                status: data.status,
                services: {
                    connect:
                        data.services?.map((serviceId) => ({
                            id: serviceId,
                        })) || [],
                },
            },
        });

        return result;
    }

    async findById(id: number): Promise<SchedulingService | null> {
        const result = await prisma.scheduling.findUnique({
            where: {
                id,
            },
            include: {
                services: true,
            },
        });

        return result;
    }

    async findAllSchedulings(date: Date): Promise<SchedulingFull[]> {
        const startOfDayUTC = new Date(date);
        startOfDayUTC.setUTCHours(0, 0, 0, 0);

        const endOfDayUTC = new Date(date);
        endOfDayUTC.setUTCHours(23, 59, 59, 999);

        const result = await prisma.scheduling.findMany({
            where: {
                date: {
                    gte: startOfDayUTC,
                    lt: endOfDayUTC,
                },
            },
            include: {
                services: true,
                client: true,
            },
        });

        const formattedResult = result.map((scheduling) => ({
            id: scheduling.id,
            date: scheduling.date,
            services: scheduling.services.map((service) => service.name),
            status: scheduling.status,
            client: getFirstName(scheduling.client.name),
        }));

        return formattedResult;
    }

    async updateScheduling(data: Scheduling): Promise<Scheduling> {
        const { date, id, status, services, clientName } = data;

        const scheduling = await prisma.scheduling.findUnique({
            where: { id },
            include: { services: true },
        });

        const newClient = await prisma.client.findUnique({
            where: { name: clientName },
        });

        if (!newClient) {
            throw new Error(`Cliente com nome ${clientName} não encontrado.`);
        }

        const existingServiceIds =
            scheduling?.services.map((service) => service.id) || [];

        const result = await prisma.scheduling.update({
            where: { id },
            data: {
                date,
                status,
                services: {
                    disconnect: existingServiceIds.map((serviceId) => ({
                        id: serviceId,
                    })),
                    connect:
                        services?.map((serviceId) => ({
                            id: serviceId,
                        })) || [],
                },
                client: {
                    connect: { id: newClient.id },
                },
            },
        });

        return result;
    }

    async deleteScheduling(id: number): Promise<boolean> {
        const scheduling = await prisma.scheduling.findUnique({
            where: { id },
            include: { services: true },
        });

        if (!scheduling) {
            throw new Error("[scheduling] - Scheduling does not exist");
        }

        const existingServiceIds = scheduling.services.map((service) => ({
            id: service.id,
        }));

        await prisma.scheduling.update({
            where: { id },
            data: {
                services: {
                    disconnect: existingServiceIds,
                },
            },
        });

        const result = await prisma.scheduling.delete({
            where: { id },
        });

        return result ? true : false;
    }
}

export { SchedulingRepositoryPrisma };
