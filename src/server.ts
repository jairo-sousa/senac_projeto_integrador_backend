import fastify, { FastifyInstance } from "fastify";
import { clientRoutes } from "./routes/client.routes";
import { schedulingRoutes } from "./routes/scheduling.routes";
import { serviceRoutes } from "./routes/service.routes";
import cors from "@fastify/cors";

const PORT = 3100;
const BASE_URL = "http://localhost";

const app: FastifyInstance = fastify();

const setCors = async () => {
    await app.register(cors, {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    });
};

setCors();

// Registrar as rotas após configurar o CORS
app.register(serviceRoutes, {
    prefix: "/service",
});

app.register(clientRoutes, {
    prefix: "/client",
});

app.register(schedulingRoutes, {
    prefix: "/scheduling",
});

app.listen(
    {
        port: PORT,
    },
    () => {
        console.log(`[server] - running on ${BASE_URL}:${PORT}`);
    }
);
