<template>
  <div>
    <div class="gerenciar_pedidos">
      <h1>Gerenciar Pedidos</h1>
    </div>
    <div>
      <Dashboard />
    </div>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default{
  name:"Pedidos",
  components: {
    Dashboard
  } 
}
</script>

<style>
* {
    
    background-color: #161616;
}

h1 {
  
  color: #ff9100;
  text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
}

</style>
