<template>
    <div class="div-pedido">
        <Message :msg="msg" :v-html="msg" />
        <form class="burger-form" @submit="createburger">
            <div class="input-container">
                <label for="nome">Nome do cliente</label>
                <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome"
                    :class="{ 'input-error': errors.nome }">
                <span v-if="errors.nome" class="error-message">
                    <div class="campo-obrigatorio">
                        Campos Obrigatório
                    </div>
                </span>
            </div>
            <div class="input-container">
                <label for="pao">Escolha o pão:</label>
                <select name="pao" id="pao" v-model="pao" :class="{ 'input-error': errors.pao }">
                    <option disabled selected value="">Selecione o seu pão</option>
                    <option v-for="pao in paes" :key="pao.id" :value="pao.id">{{ pao.pao_tipo }}</option>
                </select>
                <span v-if="errors.pao" class="error-message">
                    <div class="campo-obrigatorio">
                        Campos Obrigatório
                    </div>
                </span>

            </div>
            <div class="input-container">
                <label for="carne">Escolha a carne:</label>
                <select name="carne" id="carne" v-model="carne" :class="{ 'input-error': errors.carne }">
                    <option disabled selected value="">Selecione o tipo de carne</option>
                    <option v-for="carne in carnes" :key="carne.id" :value="carne.id">{{ carne.carne_tipo }}</option>
                </select>
                <span v-if="errors.carne" class="error-message">
                    <div class="campo-obrigatorio">
                        Campos Obrigatório
                    </div>
                </span>

            </div>
            <div id="opcionais-container" class="input-container">
                <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                <div class="checkbox-container" v-for="opcional in opcionaisData" :key="opcional.id">
                    <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.id">
                    <span>{{ opcional.opcional_tipo }}</span>
                </div>

            </div>
            <div class="input-container">
                <input type="submit" class="submit-btn" value="Criar meu burger">
            </div>
        </form>
    </div>

</template>

<script>
import Message from './Message.vue';
import axios from "axios";

export default {
    name: "BurgerForm",
    data() {
        return {
            paes: [],
            carnes: [],
            opcionaisData: [],
            nome: null,
            pao: null,
            carne: null,
            opcionais: [],
            status: "Solicitado",
            msg: "",
            errors: {
                nome: false,
                pao: false,
                carne: false
            }
        }
    },
    methods: {
        async getIngredientes() {
            try {
                console.log('CAIU NO GET INGREDIENTES');
                const [paesRes, carnesRes, opcionaisRes] = await Promise.all([
                    axios.get("http://localhost:3000/api/paes"),
                    axios.get("http://localhost:3000/api/carnes"),
                    axios.get("http://localhost:3000/api/opcionais")

                ]);

                console.log("http://localhost:3000/api/paes");
                console.log("http://localhost:3000/api/carnes");
                console.log("http://localhost:3000/api/opcionais");

                this.paes = await paesRes.data;
                this.carnes = await carnesRes.data;
                this.opcionaisData = await opcionaisRes.data;

            } catch (error) {
                console.error("Erro ao buscar ingredientes:", error);
            };
            
        },
        
        async createburger(e) {
            e.preventDefault();

            this.errors = { nome: false, pao: false, carne: false };

            if (!this.nome) this.errors.nome = true;
            if (!this.pao || this.pao === "") this.errors.pao = true;
            if (!this.carne || this.carne === "") this.errors.carne = true;

            if (this.errors.nome || this.errors.pao || this.errors.carne) return;

            const data = {
                nome: this.nome,
                pao_id: this.pao,
                carne_id: this.carne,
                opcionais_id: this.opcionais.length > 0 ? JSON.stringify(this.opcionais) : null,
                status_id: 1
            };
            console.log("Dados enviados para a API:", data);


            try {
                const response = await axios.post("http://localhost:3000/api/burgers", data);
                console.log("Resposta da API:", response.data);

                this.msg = `Pedido realizado com sucesso! Código: ${response.data.id}`;
                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                setTimeout(() => (this.msg = null), 3000);

                this.nome = "";
                this.carne = "";
                this.pao = "";
                this.opcionais = [];
            } catch (error) {
                console.error("Erro na requisição:", error.response?.data || error);
            }
        }

    },
    mounted() {
        console.log("Montando componente e chamando getIngredientes")
        this.getIngredientes();
        setTimeout(() => {
            console.log("Pães carregados: ", this.paes);
            console.log("Carnes carregadas: ", this.carnes);
            console.log("Opcionais carregados: ", this.opcionais)
        }, 3000);
    },
    components: {
        Message
    }
}
</script>

<style scoped>
.burger-form {

    max-width: 400px;
    margin: 0 auto;
}


.input-container {

    display: flex;
    flex-direction: column;
    align-content: center;
    margin-bottom: 7%;
}

label {

    font-weight: bold;
    font-size: x-large;
    margin-bottom: 7%;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #ff9100;
}

input,
select {
    width: 100%;
    height: 36px;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;

}

.input-error {
    border: 1px solid red;
}

.error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

#opcionais-container {

    flex-direction: row;
    flex-wrap: wrap;
}

#opcionais-title {
    width: 100%;

}

.checkbox-container {
    display: flex;
    align-items: center;
    width: 50%;
    margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
}

.submit-btn {
    border-radius: 20px ;
    height: 45px;
    background-color: #222;
    color: #ff9100;
    font-weight: bold;
    border: 2px solid #222;
    padding: 2px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;

}

.submit-btn:hover {
    background-color: transparent;
    color: #222;
}


.campo-obrigatorio {
    font-size: 175%;
    text-align: center;
    width: 20%;
    justify-content: center;
    color: white;
    background: #ff0022;   
    border-radius: 25px;
    padding: 20px;  
    max-width: 400px;
    margin: 50px auto;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);    
    }

</style>