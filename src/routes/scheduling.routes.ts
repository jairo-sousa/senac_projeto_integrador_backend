import { FastifyInstance } from "fastify";
import { SchedulingUseCase } from "../usecases/scheduling.usecase";
import { SchedulingCreate } from "../interfaces/scheduling.interface";

export async function schedulingRoutes(fastify: FastifyInstance) {
    const schedulingUseCase = new SchedulingUseCase();

    fastify.post<{ Body: SchedulingCreate }>("/", async (req, reply) => {
        const { date, status, clientName, services } = req.body;

        try {
            const data = await schedulingUseCase.create({
                date,
                status,
                clientName,
                services,
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await schedulingUseCase.findById(Number(id));

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get<{ Params: { date: string } }>(
        "/view-full/:date",
        async (req, reply) => {
            const { date } = req.params;

            const dateObject = new Date(date);

            if (isNaN(dateObject.getTime())) {
                throw new Error("[scheduling] - Invalid date format");
            }

            try {
                const data = await schedulingUseCase.listAllSchedulings(
                    dateObject
                );

                return reply.send(data);
            } catch (error) {
                reply.send(error);
            }
        }
    );

    fastify.put<{ Body: SchedulingCreate; Params: { id: string } }>(
        "/:id",
        async (req, reply) => {
            const { id } = req.params;
            const { clientName, date, status, services } = req.body;

            try {
                const data = await schedulingUseCase.updateScheduling({
                    date,
                    id: Number(id),
                    status,
                    services,
                    clientName,
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
            const data = await schedulingUseCase.deleteScheduling(Number(id));

            reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
}
