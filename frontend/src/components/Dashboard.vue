<template>
    <div id="burger-table" v-if="burgers">
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Ações:</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div id="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.nome }}</div>
                <div>{{ burger.pao }}</div>
                <div>{{ burger.carne }}</div>
                <div>
                    <ul v-if="burger.opcionais && burger.opcionais.length > 0">
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">
                            {{ opcional }}
                        </li>
                    </ul>
                    <span v-else>Sem opcionais</span> <!-- Mensagem alternativa -->
                </div>
                <div>
                    <select name="status" class="status" v-model="burger.status_id" @change="updateBurger(burger)">
                        <option value="">Selecione</option>
                        <option :value="s.id" v-for="s in status" :key="s.id">
                            {{ s.status_tipo }}
                        </option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>

        </div>
    </div>
    <div v-else>
        <h2>Não há pedidos no momento.</h2>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Dashboard",
    data() {
        return {
            burgers: [],
            status: [],
            opcionaisLista: []
        };
    },
    methods: {
        async getPedidos() {
            try {
                const response = await axios.get("http://localhost:3000/api/burgers");
                this.burgers = response.data;

                await this.buscarDetalhesDosBurgers();

                this.getStatus();
            } catch (error) {
                console.error("Erro ao buscar pedidos: ", error);
            }
        },
        async buscarDetalhesDosBurgers() {
            try {
                // Buscar os detalhes dos ingredientes de forma otimizada
                const paesResponse = await axios.get("http://localhost:3000/api/paes");
                const carnesResponse = await axios.get("http://localhost:3000/api/carnes");
                const opcionaisResponse = await axios.get("http://localhost:3000/api/opcionais");

                const paesMap = Object.fromEntries(paesResponse.data.map(p => [p.id, p.pao_tipo]));
                const carnesMap = Object.fromEntries(carnesResponse.data.map(c => [c.id, c.carne_tipo]));
                const opcionaisMap = Object.fromEntries(opcionaisResponse.data.map(o => [o.id, o.opcional_tipo]));

                // Atualizar os burgers com os nomes correspondentes
                this.burgers = this.burgers.map(burger => ({
                    ...burger,
                    pao: paesMap[burger.pao_id] || "Desconhecido",
                    carne: carnesMap[burger.carne_id] || "Desconhecido",
                    opcionais: burger.opcionais_id
                        ? JSON.parse(burger.opcionais_id).map(id => opcionaisMap[id] || "Desconhecido")
                        : []
                }));

                this.$forceUpdate();
            } catch (error) {
                console.error("Erro ao buscar detalhes dos burgers:", error);
            }
        },

        async getStatus() {
            try {
                const response = await axios.get("http://localhost:3000/api/status");
                this.status = response.data;
            } catch (error) {
                console.error("Erro ao buscar status: ", error);
            }
        },

        async getOpcionais() {
            try {
                const response = await axios.get("http://localhost:3000/api/opcionais");
                this.opcionaisLista = response.data;
            } catch (error) {
                console.error("Erro ao buscar opcionais: ", error);
            }
        },

        nomeDoOpcional(id) {
            if (!this.opcionaisLista.length) return "Carregando..."; // Se os opcionais ainda não foram carregados
            const opcional = this.opcionaisLista.find(op => op.id === id);
            return opcional ? opcional.nome : "Desconhecido";
        },
        async deleteBurger(id) {
            try {
                await axios.delete(`http://localhost:3000/api/burgers/${id}`);
                this.getPedidos(); // Atualiza a lista após deletar
            } catch (error) {
                console.error("Erro ao deletar pedido: ", error);
            }
        },
        async updateBurger(burger) {
            console.log(burger)
            const status_id = burger.status_id; // Pegando ID do status
            try {
                console.log(status_id);
                await axios.put(`http://localhost:3000/api/burgers/${burger.id}/status`, { status_id }); // Enviando status_id
                console.log(`Pedido ${id} atualizado para status ${status_id}`);
                this.getPedidos = response.data; // Atualiza a tabela após a mudança
            } catch (error) {
                console.error("Erro ao atualizar pedido: ", error);
            }
        }
    },
    mounted() {
        this.getPedidos();
        this.getStatus();
        this.getOpcionais();
    }
};
</script>

<style scoped>
#burger-table {
    
    max-width: 1200px;
    margin: 0 auto;

}

#burger-table-heading,
#burger-table-rows,
#burger-table-row {
     
    display: flex;
    flex-wrap: wrap;
}

#burger-table-heading {
    
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}

#burger-table-heading div,
#burger-table-row div {
    width: 19%;
}

#burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #ccc;
}


#burger-table-heading .order-id,
#burger-table-row .order-number{
    width: 5%;
}


select  {
    padding: 12px 6px;
    margin-right: 12px;
}

.delete-btn{
    background-color: #222;
    color: #fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
}

.delete-btn:hover {
    background-color: transparent;
    color: #222;
  }

</style>