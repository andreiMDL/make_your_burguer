<template>
    <div>
        <div>
            <p>Componente de Mensagem</p>
        </div>
        <form id="burguer-form">
            <div class="input-container">
                <label for="nome">Nome do cliente</label>
                <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
            </div>
            <div class="input-container">
                <label for="pao">Escolha o pão:</label>
                <select name="pao" id="pao" v-model="pao"></select>
                <option value="">Selecione o seu pão</option>
                <option value="integral">Integral</option>
            </div>
            <div class="input-container">
                <label for="carne">Escolha a carne:</label>
                <select name="carne" id="carne" v-model="carne"></select>
                <option value="">Selecione o tipo de carne</option>
                <option value="patinho">Patinho</option>
            </div>
            <div id="opcionais-container" class="input-container">
                <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                <div class="checkbox-container">
                    <input type="checkbox" name="opcionais" v-model="opcionais" value="salame">
                    <span>Salame</span>
                </div>
                <div class="checkbox-container">
                    <input type="checkbox" name="opcionais" v-model="opcionais" value="salame">
                    <span>Salame</span>
                </div>
                <div class="checkbox-container">
                    <input type="checkbox" name="opcionais" v-model="opcionais" value="salame">
                    <span>Salame</span>
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
    name: "BuguerForm"
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

input,
select {
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