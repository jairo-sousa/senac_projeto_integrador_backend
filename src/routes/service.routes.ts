import { FastifyInstance } from "fastify";
import { ServiceUseCase } from "../usecases/service.usecase";
import { ServiceCreate } from "../interfaces/service.interface";

export async function serviceRoutes(fastify: FastifyInstance) {
    const serviceUseCase = new ServiceUseCase();

    fastify.post<{ Body: ServiceCreate }>("/", async (req, reply) => {
        const { description, duration, name, price } = req.body;

        try {
            const data = await serviceUseCase.create({
                description,
                duration,
                name,
                price,
            });

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get("/view-analogic", async (req, reply) => {
        try {
            const data = await serviceUseCase.findAllServices();

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get("/view-names", async (req, reply) => {
        try {
            const data = await serviceUseCase.findNames();

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await serviceUseCase.findById(Number(id));

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.put<{ Body: ServiceCreate; Params: { id: string } }>(
        "/:id",
        async (req, reply) => {
            const { id } = req.params;
            const { description, duration, name, price } = req.body;
            try {
                const data = await serviceUseCase.updateService({
                    description,
                    duration,
                    id: Number(id),
                    name,
                    price,
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
            const data = await serviceUseCase.deleteService(Number(id));

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
}
