<template>
    <div id="burger-table" v-if="burgers">
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#</div>
                <div>Cliente</div>
                <div>Pão</div>
                <div>Carne</div>
                <div>Opcionais</div>
                <div>Status</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-card" v-for="burger in burgers" :key="burger.id">
                <div id="burger-table-row">
                    <div class="order-number">{{ burger.id }}</div>
                    <div>{{ burger.nome }}</div>
                    <div>{{ burger.pao }}</div>
                    <div>{{ burger.carne }}</div>
                    <div class="opcionais">
                        <ul v-if="burger.opcionais && burger.opcionais.length > 0">
                            <li v-for="(opcional, index) in burger.opcionais" :key="index">
                                {{ opcional }}
                            </li>
                        </ul>
                        <span v-else>Sem opcionais</span>
                    </div>
                    <div class="actions">
                        <select name="status" class="status" v-model="burger.status_id" @change="updateBurger(burger)">
                            <option value="">Selecione</option>
                            <option :value="s.id" v-for="s in status" :key="s.id">
                                {{ s.status_tipo }}
                            </option>
                        </select>
                        <button class="delete-btn" @click="deleteBurger(burger.id)">
                            <img src="/img/trash.png" alt="Excluir" class="trash-icon">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { TrashIcon } from "lucide-vue-next";

export default {
    name: "Dashboard",
    components: [TrashIcon],
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
    font-style: bold;
    max-width: 90%;
    margin: 0 auto;
    margin-bottom: 5% ;
    border-radius: 25px;
    box-shadow: inset 0px 0px 15px rgb(0, 0, 0);
    padding: 3%;
    overflow: hidden;
}

#burger-table-rows {
    padding-top: 1%;
}


#burger-table-row {
    font-weight: bold;
    height: 120px;
    justify-content: center;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0px 0px 15px rgb(0, 0, 0);
    width: 100%;
    padding: 12px;
    background-color: #222;
    color: #b9b9b9;
    align-items: center;
    text-align: center;
}

.burger-card {
    width: 100%;
    text-align: center;
    background-color: #161616;    
    margin-bottom: 1%;    
}


#burger-table-heading {

    text-shadow: 0px 0px 10px rgba(255, 166, 0, 0.485);
    box-shadow: 0px 0px 20px rgb(0, 0, 0);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #222;
    font-weight: bold;
    padding: 2%;
    border-bottom: 2px solid #ff9100;
    color: #ff9100;
}


#burger-table-heading div {
    width: 20%;
    background-color: #222;
     
}

#burger-table-row div {
    width: 19%;
    background-color: #222;
}


.opcionais {
    background-color: inherit;
    color: inherit;
}

.opcionais ul {
    background-color: inherit; /* Mantém a mesma cor do fundo */
    color: inherit; /* Mantém a mesma cor do texto */

    list-style: none; 
}

.opcionais ul li {
    background-color: inherit;
    color: inherit; 
    
    
}

#burger-table-heading .order-id,
#burger-table-row .order-number {
    width: 5%;
}

.actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

select {
    text-align: center;
    font-weight: bold;
    background-color: #333;
    width: 80%;
    height: 36px;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 25px;
    border: 1px solid #222;
    color: #ff9100;
    box-shadow: 0px 0px 20px rgba(9, 9, 9, 0.981);
    text-shadow: 0px 0px 10px rgba(255, 166, 0, 0.5);
    font-style: bold;
    
}

.delete-btn{
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px;
    transition: transform 0.2s ease-in-out;
}

.delete-btn:hover {
    transform: scale(1.1);
    
} 

.trash-icon {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    background-color: transparent;
}

span {
    background-color: inherit;
    color: inherit; 
}

</style>