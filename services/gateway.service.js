const ApiGateway = require("moleculer-web");

module.exports = {
    name: "gateway",
    mixins: [ApiGateway],
    settings: {
        port: 3000,
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        },
        routes: [
            {
                path: "/api",
                aliases: {
                    "GET /paes": "paes.list",
                    "GET /carnes": "carnes.list",
                    "GET /opcionais": "opcionais.list",
                    "GET /status": "status.list",
                    "GET /burgers": "burgers.list",
                    "POST /burgers": "burgers.create",
                    "DELETE /burgers/:id": "burgers.remove",
                    "PUT /burgers/:id/status": "burgers.updateStatus"
                }
            }
        ]
    }
};
