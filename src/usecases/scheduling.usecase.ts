import { ClientRepository } from "../interfaces/client.interface";
import {
    Scheduling,
    SchedulingCreate,
    SchedulingRepository,
} from "../interfaces/scheduling.interface";
import { ClientRepositoryPrisma } from "../repositories/client.repository";
import { SchedulingRepositoryPrisma } from "../repositories/scheduling.repository";

class SchedulingUseCase {
    private schedulingRepository: SchedulingRepository;
    private clientRepository: ClientRepository;

    constructor() {
        this.schedulingRepository = new SchedulingRepositoryPrisma();
        this.clientRepository = new ClientRepositoryPrisma();
    }

    async create(scheduling: SchedulingCreate) {
        const { date, status, clientName, services } = scheduling;

        const client = await this.clientRepository.findByName(clientName);

        if (!client) {
            throw new Error("Client not found");
        }

        const result = await this.schedulingRepository.create({
            date,
            status,
            clientId: client.id,
            services: services ?? [],
        });
        return result;
    }

    async findById(id: number) {
        const scheduling = await this.schedulingRepository.findById(id);

        return scheduling;
    }

    async listAllSchedulings(date: Date) {
        const schedulings = await this.schedulingRepository.findAllSchedulings(
            date
        );

        return schedulings;
    }

    async updateScheduling(scheduling: Scheduling) {
        const { date, id, status, services } = scheduling;

        const data = await this.schedulingRepository.updateScheduling(
            scheduling
        );

        return data;
    }

    async deleteScheduling(id: number) {
        const data = await this.schedulingRepository.deleteScheduling(id);

        return data;
    }
}

export { SchedulingUseCase };
