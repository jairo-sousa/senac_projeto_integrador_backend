import { Client, ClientCreate } from "../interfaces/client.interface";
import { ClientRepositoryPrisma } from "../repositories/client.repository";

class ClientUseCase {
    private clientRepository: ClientRepositoryPrisma;

    constructor() {
        this.clientRepository = new ClientRepositoryPrisma();
    }

    async create(client: ClientCreate): Promise<Client> {
        const { birthdate, city, name, neighborhood, phone, state, street } =
            client;

        const verifyIfClientExists = await this.clientRepository.findByName(
            name
        );

        if (verifyIfClientExists) {
            throw new Error("[client] - Client already exists");
        }

        const result = await this.clientRepository.create({
            birthdate,
            city,
            name,
            neighborhood,
            phone,
            state,
            street,
        });

        return result;
    }

    async listNames() {
        const clients = await this.clientRepository.findNames();

        return clients;
    }

    async listAllClients() {
        const clients = await this.clientRepository.findAllClients();

        return clients;
    }

    async findById(id: number) {
        const services = await this.clientRepository.findById(id);

        return services;
    }

    async updateClient(client: Client) {
        const {
            id,
            birthdate,
            city,
            name,
            neighborhood,
            phone,
            state,
            street,
        } = client;

        const data = await this.clientRepository.updateClient(client);

        return data;
    }

    async deleteClient(id: number) {
        const data = await this.clientRepository.deleteClient(id);

        return data;
    }
}

export { ClientUseCase };
