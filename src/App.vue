<template>
  <div> 
    <Navbar :logo="logo_src" :alt="app_name"/>
    <div>
      <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
      <component :is="Component"></component>
      </transition>
    </router-view>
    </div>
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
      app_name: "Make_Your_burger"
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

  .gerenciar_pedidos{
    
    padding-top: 9%;
    padding-bottom: 3%;
    
    min-height: border-box;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }


  /* route transitions */
  .route-enter-from{
    opacity: 0;
    transform: translateX(100px);
  }
  .route-enter-active{
    transition: all 0.3s ease-out;
  }

  .route-leave-to{ 
    opacity: 0;
    transform: translateX(-100px);
  }
  .route-leave-active {
    transition: all 0.3s ease-in;
  }
</style>
