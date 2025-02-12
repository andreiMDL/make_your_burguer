<template>
    <div>
        <div>
            <p>Componente de Mensagem</p>
        </div>
        <form id="burguer-form" @submit="createBurguer">
            <div class="input-container">
                <label for="nome">Nome do cliente</label>
                <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
            </div>
            <div class="input-container">
                <label for="pao">Escolha o pão:</label>
                <select name="pao" id="pao" v-model="pao">
                    <option value="SelecioneSeuPao">Selecione o seu pão</option>
                    <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                </select>
                
            </div>
            <div class="input-container">
                <label for="carne">Escolha a carne:</label>
                <select name="carne" id="carne" v-model="carne">
                    <option value="">Selecione o tipo de carne</option>
                    <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                </select>
                
            </div>
            <div id="opcionais-container" class="input-container">
                <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                <div class="checkbox-container" v-for="opcional in opcionaisData" :key="opcional.id">
                    <input type="checkbox" name="opcionais" v-model="opcionais" :value="salame">
                    <span>{{ opcional.tipo }}</span>
                </div>
                
            </div>
            <div class="input-container">
                <input type="submit" class="submit-btn" value="Criar meu burguer">
            </div>
        </form>
    </div>

</template>

<script>


export default {
    name: "BuguerForm",
    data() {
        return {
            paes: "selecioneSeuPao",
            carnes: null,
            opcionaisData: null,
            nome: null,
            pao: null,
            carne: null,
            opcionais: [],
            status: "Solicitado",
            msg: null
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
        async createBurguer(e) {

            e.preventDefault();

            console.log("Criou burguer");
            
        }
    },
    mounted() {
        this.getIngredientes(); 
    }
}
</script>

<style scoped>
#burguer-form {
    
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
    border-left: 4px solid #fcba03;
}

input, select {
    width: 100%;     /* Largura total do contêiner */
    height: 36px;    /* Altura maior para a caixa */
    font-size: 16px; /* Aumenta o tamanho da fonte */
    padding: 10px;   /* Adiciona mais espaço interno */
    box-sizing: border-box;

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
.checkbox-container input{
    width: auto; 
}

.checkbox-container span{
    margin-left: 6px;
    font-weight: bold;
}

.submit-btn {
    height: 45px;
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 2px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;

}

.submit-btn:hover{
    background-color: transparent;
    color: #222;
}

</style>