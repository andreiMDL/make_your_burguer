<template>
  <div>
    <Navbar :logo="logo_src" :alt="app_name"/>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue"
import Navbar from "./components/Navbar.vue"

export default{
  components: {
    Navbar,
    Footer
  },
  data() {
    return{
      logo_src: "/img/logo.png",
      app_name: "Make_Your_Burguer"
    }
  }
}
</script>

<style>
  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container{
    margin: 18px;
    min-height: border-box;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
