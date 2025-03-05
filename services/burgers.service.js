const DbService = require("moleculer-db");
const Sequelize = require("sequelize");
const adapter = require("./db.adapter");

module.exports = {
    name: "burgers",
    mixins: [DbService],
    adapter,
    model: {
        name: "Burgers",
        define: {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            nome: { type: Sequelize.STRING, allowNull: false },
            pao_id: { type: Sequelize.INTEGER, allowNull: false },
            carne_id: { type: Sequelize.INTEGER, allowNull: false },
            status_id: { type: Sequelize.INTEGER, allowNull: false },
            opcionais_id: { type: Sequelize.STRING, allowNull: true }
        },
        options: {
            timestamps: false
        }
    },
    actions: {
        list: {
            rest: "GET /",
            async handler(ctx) {
                const burgers = await this.adapter.find({ raw: true });
            
                const paes = await ctx.call("paes.list");
                const carnes = await ctx.call("carnes.list");
                const opcionais = await ctx.call("opcionais.list");    
                               
                console.log("Paes carregados:", paes);
                console.log("Carnes carregadas:", carnes);
                console.log("Opcionais carregados:", opcionais);

                const paoMap = Object.fromEntries(paes.map(p => [p.id, p.pao_tipo]));
                const carneMap = Object.fromEntries(carnes.map(c => [c.id, c.carne_tipo]));
                const opcionaisMap = Object.fromEntries(opcionais.map(o => [o.id, o.opcional_tipo]));

                // biome-ignore lint/complexity/noForEach: <explanation>
                burgers.forEach(burger => {
                    burger.pao = paoMap[burger.pao_id] || "Desconhecido";
                    burger.carne = carneMap[burger.carne_id] || "Desconhecido";

                    try {
                        let opcionaisIds = burger.opcionais_id ? JSON.parse(burger.opcionais_id) : [];
                        if (!Array.isArray(opcionaisIds)){
                            opcionaisIds = "Erro o carregar opcionais";
                        }


                        burger.opcionais = opcionaisIds.map(id => opcionaisMap[id] || "Desconhecido")
                    } catch ( error){
                        burger.opcionais = "Erro ao carregar opcionais";
                    }
                });

                return burgers;
            },
        },
        updateStatus: {
            params: {
                status_id: "number"
            },
            async handler(ctx) {
                const { id, status_id } = ctx.params;
                await this.adapter.updateById(id, { $set: { status_id } });
                return { message: "Status atualizado!" };
            
            }
        },

        async remove(ctx) {
            const { id } = ctx.params;
            await this.adapter.removeById(id);
            return { message: "Pedido removido com sucesso!" };
        },
    
    }
}



