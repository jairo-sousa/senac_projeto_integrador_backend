import { prisma } from "../database/prismaClient";
import {
    Client,
    ClientBase,
    ClientCreate,
    ClientName,
    ClientRepository,
} from "../interfaces/client.interface";
import { SchedulingUseCase } from "../usecases/scheduling.usecase";
import { format } from "date-fns";

class ClientRepositoryPrisma implements ClientRepository {
    async create(data: ClientCreate): Promise<Client> {
        const result = await prisma.client.create({
            data: {
                name: data.name,
                birthdate: data.birthdate,
                city: data.city,
                neighborhood: data.neighborhood,
                phone: data.phone,
                state: data.state,
                street: data.street,
            },
        });

        return result;
    }

    async findByName(name: string): Promise<Client | null> {
        const result = await prisma.client.findFirst({
            where: {
                name,
            },
        });

        return result || null;
    }

    async findNames(): Promise<ClientName[] | null> {
        const result = await prisma.client.findMany();

        const formattedResult = result.map((client) => ({
            id: client.id,
            name: client.name,
        }));

        return formattedResult;
    }

    async findAllClients(): Promise<ClientBase[]> {
        const result = await prisma.client.findMany();

        const formattedResult = result.map((client) => ({
            ...client,
            birthdate: format(client.birthdate, "dd/MM/yyyy"),
        }));

        return formattedResult;
    }

    async findById(id: number): Promise<Client | null> {
        const result = await prisma.client.findUnique({
            where: {
                id,
            },
        });

        return result || null;
    }

    async updateClient(data: Client): Promise<Client> {
        const {
            birthdate,
            city,
            id,
            name,
            neighborhood,
            phone,
            state,
            street,
        } = data;
        const result = await prisma.client.update({
            where: {
                id,
            },
            data: {
                birthdate,
                city,
                name,
                neighborhood,
                phone,
                state,
                street,
            },
        });

        return result;
    }

    async deleteClient(id: number): Promise<Boolean> {
        const schedulingUseCase = new SchedulingUseCase();

        const scheduling = await prisma.scheduling.findFirst({
            where: { clientId: id },
        });

        if (scheduling) {
            await schedulingUseCase.deleteScheduling(scheduling.id);
        }

        const result = await prisma.client.delete({
            where: {
                id,
            },
        });

        return result ? true : false;
    }
}

export { ClientRepositoryPrisma };
