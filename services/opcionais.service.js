const DbService = require("moleculer-db");
const Sequelize = require("sequelize");
const adapter = require("./db.adapter");

module.exports = {
    name: "opcionais",
    mixins: [DbService],
    adapter,
    model: {
        name: "Opcionais",
        define: {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            opcional_tipo: { type: Sequelize.STRING, allowNull: false }
        },
        options: {
            timestamps: false // 🔥 Adicione esta linha para remover createdAt e updatedAt
        }
    },
    actions: {
        list: {
            rest: "GET /",
            async handler(ctx) {
                try {
                    const dados = await this.adapter.find({});
                    return dados;
                } catch (error) {
                    console.error("Erro ao buscar dados da tabela Opcionais:", error);
                    throw new Error("Erro ao buscar dados da tabela Opcionais.");
                }
            }
        },
        getById: {
            rest: "GET /:id",
            async handler(ctx) {
                const id = ctx.params.id;
                return await this.adapter.findOne({ where: { id } });
            }
        }
    }
};
