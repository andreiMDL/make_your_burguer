<template>
  <div id="main-banner">
    <!-- Adicionar animação de transição -->
    <a @click="scrollToSection" href="#div-pedido">Make Your Burger</a>
  </div>
</template>

<script>
export default {
  name: "Banner",
  methods: {

    scrollToForm(event) {
      event.preventDefault();
      const section = document.querySelector("#burger-form");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}
</script>

<style scoped>
#main-banner {
  background-image: url("/public/img/burger.jpg");
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: 600px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-banner a {
  text-decoration: none;
  margin-left: 165px;
  border-radius: 25px;
  border: 3px solid #fcba03;
  margin-top: -100px;
  color: #fff;
  text-align: center;
  color: #fcba03;
  font-size: 60px;
  background-color: #3d360150;
  padding: 20px 40px;
  transition: .5s;
}

#main-banner a:hover {
  color: #ffffff;
  background-color: #15130e;
}


@media (max-width: 1061px) {
  #main-banner {
    background-position: right bottom;
    }
  }
</style>