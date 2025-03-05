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
    background-color: #222;
}

h1 {
  padding: 1%;
  color: #ff9100;
}

</style>
