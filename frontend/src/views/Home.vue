<template>
  <div>
    <Banner />
  <div class="main-container">
    
    <h1>Monte o seu burger</h1>
    <burgerForm />
  </div>
  </div>
  
</template>

<script>
import Banner from '@/components/Banner.vue';
import burgerForm from '@/components/BurgerForm.vue';

export default {
  name: "Home",
  components: {
    Banner ,
    burgerForm
  }
}

</script>

<style>
* {
  border-top: 2px #161616;
    background-color: #222;
}

h1 {
  margin-top: 2%;
  padding: 1%;
  color: #ff9100;
  text-shadow: 0px 0px 15px rgb(0, 0, 0);
}

</style>
