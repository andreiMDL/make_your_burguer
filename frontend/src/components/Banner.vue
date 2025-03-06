<template>
  <div class="main-banner">
    <!-- Adicionar animação de transição -->
    <a @click="scrollToForm" href="#div-pedido">Make Your Burger</a>
    
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods: {

    scrollToForm(event) {
      event.preventDefault();
      const section = document.querySelector(".burger-form");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
</script>

<style scoped>
.main-banner {
  background-image: url("/public/img/burger.jpg");
  background-position: center;
  background-size: cover;
  min-height: 600px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 4px solid #080808;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.761);
}

.main-banner a {
  
  text-decoration: none; 
  margin-left: 6%;
  border-radius: 25px;
  font-family: "Marck Script", serif; 
  font-size: 350%;
  border: 1px solid #ff9100;
  margin-left: 8% ;
  color: #ff9100;
  text-align: center;
  background-color: #08060000;
  padding: 1% 3%;
  transition: .5s;
  text-shadow: 0px 0px 30px rgba(255, 166, 0, 0.5);

}
.main-banner a:hover {
  font-weight: bold;
  box-shadow: 0px 0px 20px rgba(255, 140, 0, 0.5);
  text-shadow: 0px 0px 20px rgba(112, 62, 1, 0.5);
  color: #9e5a00;
  
  background-color: #cab989;
  
}


@media (max-width: 1061px) {
  .main-banner {
    background-position: right bottom;
    }
  }
</style>