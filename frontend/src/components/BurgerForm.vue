<template>
    <div class="div-pedido">
        <Message :msg="msg" :v-html="msg" />
        <form class="burger-form" @submit="createburger">
            <div class="input-container">
                <label for="nome">Nome do cliente</label>
                <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome"
                    :class="{ 'input-error': errors.nome }">
                <transition name="fade">
                    <span v-if="errors.nome" class="error-message">
                        <div class="campo-obrigatorio">
                            Campos Obrigatórios
                        </div>
                    </span>
                </transition>
            </div>
            <div class="input-container">
                <label for="pao">Escolha o pão</label>
                <select name="pao" id="pao" v-model="pao" :class="{ 'input-error': errors.pao }">

                    <option v-for="pao in paes" :key="pao.id" :value="pao.id">{{ pao.pao_tipo }}</option>
                </select>
                <transition name="fade">
                    <span v-if="errors.pao" class="error-message">
                        <div class="campo-obrigatorio">
                            Campos Obrigatórios
                        </div>
                    </span>
                </transition>
            </div>
            <div class="input-container">
                <label for="carne">Escolha a carne</label>
                <select name="carne" id="carne" v-model="carne" :class="{ 'input-error': errors.carne }">
                    <option v-for="carne in carnes" :key="carne.id" :value="carne.id">{{ carne.carne_tipo }}</option>
                </select>
                <transition name="fade">
                    <span v-if="errors.carne" class="error-message">
                        <div class="campo-obrigatorio">
                            Campos Obrigatórios
                        </div>
                    </span>
                </transition>
            </div>
            <div id="opcionais-container" class="input-container">
                <label id="opcionais-title" for="opcionais">Selecione os opcionais</label>
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

            if (this.errors.nome || this.errors.pao || this.errors.carne) {
                setTimeout(() => {
                    this.errors = { nome: false, pao: false, carne: false };
                }, 3000);
                return;
            }

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
                setTimeout(() => (this.msg = ""), 3000);

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

    background-color: #161616;
    border-radius: 35px;
    padding: 3%;
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 3%;
    box-shadow: inset 0px 0px 35px rgb(9, 9, 9);
}

.input-container {

    border-radius: 25px;
    background-color: #161616;
    display: flex;
    flex-direction: column;
    align-content: center;
    margin-bottom: 7%;
}


label {

    background-color: #161616;
    font-weight: bold;
    font-size: x-large;
    margin-bottom: 7%;
    color: #ff9100;
    padding: 5px 10px;
    border-left: 4px solid #ff9100;
    text-shadow: 0px 0px 30px rgb(0, 0, 0);
}

input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid #ff9100;
    border-radius: 5px;
    background-color: #222;
    display: inline-block;
    position: relative;
    cursor: pointer;
}

input[type="checkbox"]:checked {
    background-color: #ff910071;
    box-shadow: 0px 0px 30px rgba(255, 166, 0, 0.5);
    border: 2px solid #ff9100;
}

input {
    background-color: #222;
    width: 100%;
    height: 36px;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 25px;
    border: 1px solid #222;
    color: #ff9100;
    box-shadow: 0px 0px 15px rgba(9, 9, 9, 0.981);
}

select {

    background-color: #222;
    width: 100%;
    height: 36px;
    font-size: 16px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 25px;
    border: 1px solid #222;
    color: #ff9100;
    box-shadow: 0px 0px 20px rgba(9, 9, 9, 0.981);
}

select option {
    background-color: #161616;
    color: #ff9100;
    border: none;
}

select:focus {
    border-radius: 25px;
    outline: none;
}

.input-error {
    border: 1px solid red;
    box-shadow: inset 0px 0px 10px rgba(255, 0, 0, 0.981);
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
    background-color: #161616;
    display: flex;
    align-items: center;
    width: 50%;
    margin-bottom: 20px;
    color: #b9b9b9;
}

.checkbox-container input:hover {
    box-shadow: 0px 0px 20px rgba(149, 82, 0, 0.5);
}

.checkbox-container span,
.checkbox-container input {
    transition: .2s ease-in-out;
    width: auto;
    background-color: #161616;
}

.checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
}


.submit-btn {

    text-decoration: none;
    border-radius: 25px;
    font-size: 100%;
    border: 1px solid #222;
    color: #ff9100;
    text-align: center;
    background-color: #222;
    height: 45px;
    box-shadow: 0px 0px 15px rgba(9, 9, 9, 0.981);
    transition: .5s;

}

.submit-btn:hover {
    text-shadow: 0px 0px 30px rgba(255, 140, 0, 0.694);
    box-shadow: inset 0px 0px 15px rgba(7, 7, 7, 0.981);
    background-color: #111111;
    
    color: #ff9100;
}


.campo-obrigatorio {
    font-size: 175%;
    text-align: center;
    width: 20%;
    justify-content: center;
    
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
    
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-out;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transition: opacity 0.5s ease-out;
}

</style>