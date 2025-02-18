<template>
    <div class="div-pedido">
        <Message :msg="msg" :v-show="msg" :v-html="msg"/>
        <form class="burger-form" @submit="createburger">
            <div class="input-container" >
                <label for="nome">Nome do cliente</label>
                <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome" :class="{'input-error': errors.nome}">
                <span v-if="errors.nome" class="error-message">Nome é obrigatório</span>
            </div>
            <div class="input-container">
                <label for="pao">Escolha o pão:</label>
                <select name="pao" id="pao" v-model="pao">
                    <option disabled selected value="SelecioneSeuPao">Selecione o seu pão</option>
                    <option v-for="pao in paes" :key="pao.id" :value="pao.tipo" :class="{'input-error': errors.pao}">{{ pao.tipo }} </option>
                    <span v-if="errors.pao" class="error-message">Campo Obrigatório</span>
                </select>

            </div>
            <div class="input-container">
                <label for="carne">Escolha a carne:</label>
                <select name="carne" id="carne" v-model="carne">
                    <option disabled selected value="selecioneSuaCarne">Selecione o tipo de carne</option>
                    <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo" :class="{'input-error': errors.carne}">{{ carne.tipo }}</option>
                </select>
                <span v-if="errors.carne" class="error-message">Campo Obrigatório</span>

            </div>
            <div id="opcionais-container" class="input-container">
                <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                <div class="checkbox-container" v-for="opcional in opcionaisData" :key="opcional.id">
                    <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                    <span>{{ opcional.tipo }}</span>
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

export default {
    name: "BuguerForm",
    data() {
        return {
            paes: "selecioneSeuPao",
            carnes: "selecioneSuaCarne",
            opcionaisData: null,
            nome: null,
            pao: null,
            carne: null,
            opcionais: [],
            status: "Solicitado",
            msg: null,
            errors: {}
        }
    },
    methods: {
        async getIngredientes() {

            const req = await fetch('http://localhost:3000/ingredientes');
            const data = await req.json();

            this.paes = data.paes;
            this.carnes = data.carnes;
            this.opcionaisData = data.opcionais;

            console.log(data);

        },
        async createburger(e) {

            e.preventDefault();

            this.errors = {};

            if(!this.nome){
                this.errors.nome = true;
            }
            if(!this.pao || this.pao === 'SelecioneSeuPao') {
                this.errors.pao = true;
            }
            if(!this.carne || this.carne === 'SelecioneSuaCarne') {
                this.errors.carne = this.carne;
            }
            if (Object.keys(this.errors).length > 0){
                return;
            }

            const data = { 
                
                nome: this.nome,
                carne: this.carne,
                pao: this.pao,
                opcionais: Array.from(this.opcionais),
                status: "Solicitado"
            }
            const dataJson = JSON.stringify(data);

            const req = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            const res = await req.json();

  
            this.msg = `Pedido realizado com sucesso! Código: ${res.id}`;

            setTimeout(() => this.msg = "", 3000);

            //limpar os campos
            this.nome = "",
            this.carne = "",
            this.pao = "",
            this.opcionais = []

        }
    },
    mounted() {
        this.getIngredientes();
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
    margin-bottom: 45px;
}

label {

    font-weight: bold;
    font-size: x-large;
    margin-bottom: 15px;
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

input-error {
    border: 2px solid red;
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
</style>