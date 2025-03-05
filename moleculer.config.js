module.exports = {
    namespace: "burgers-app",
    nodeID: null,
    transporter: "NATS", // Usa o NATS como message broker (pode ser RabbitMQ, Kafka, etc.)
    logger: true,
    logLevel: "info",
    serializer: "JSON",
    
    // Configuração do API Gateway
    api: {
        port: 3000,
        routes: [
            {
                path: "/api",
                aliases: {
                    "GET /paes": "paes.list",
                    "GET /carnes": "carnes.list",
                    "GET /opcionais": "opcionais.list",
                    "GET /burgers": "burgers.list",
                    "POST /burgers": "burgers.create",
                    "PUT /burgers/:id/status": "burgers.updateStatus"
                },
                cors: {
                    origin: "*",
                    methods: ["GET", "POST","PATCH", "PUT", "DELETE"],
                },
            },
        ],
    },
};
