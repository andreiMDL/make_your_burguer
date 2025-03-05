const DbService = require("moleculer-db");
const Sequelize = require("sequelize");
const adapter = require("./db.adapter");

module.exports = {
    name: "status",
    mixins: [DbService],
    adapter,
    model: {
        name: "Statu",
        define: {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            status_tipo: { type: Sequelize.STRING, allowNull: false }
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
                    console.error("Erro ao buscar dados da tabela Status:", error);
                    throw new Error("Erro ao buscar dados da tabela Status.");
                }
            }
        }
    }
};
