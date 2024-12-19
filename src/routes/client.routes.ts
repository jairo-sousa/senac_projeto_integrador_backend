import { FastifyInstance } from "fastify";
import { ClientUseCase } from "../usecases/client.usecase";
import { ClientCreate } from "../interfaces/client.interface";

export async function clientRoutes(fastify: FastifyInstance) {
    const clientUseCase = new ClientUseCase();

    fastify.post<{ Body: ClientCreate }>("/", async (req, reply) => {
        const { birthdate, city, name, neighborhood, phone, state, street } =
            req.body;

        try {
            const data = await clientUseCase.create({
                birthdate,
                city,
                name,
                neighborhood,
                phone,
                state,
                street,
            });

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get("/view-simple", async (req, reply) => {
        try {
            const data = await clientUseCase.listAllClients();

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get("/view-names", async (req, reply) => {
        try {
            const data = await clientUseCase.listNames();

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await clientUseCase.findById(Number(id));

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.put<{ Body: ClientCreate; Params: { id: string } }>(
        "/:id",
        async (req, reply) => {
            const { id } = req.params;
            const {
                birthdate,
                city,
                name,
                neighborhood,
                phone,
                state,
                street,
            } = req.body;
            try {
                const data = await clientUseCase.updateClient({
                    birthdate,
                    city,
                    id: Number(id),
                    name,
                    neighborhood,
                    phone,
                    state,
                    street,
                });

                return reply.send(data);
            } catch (error) {
                reply.send(error);
            }
        }
    );

    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await clientUseCase.deleteClient(Number(id));

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
}
