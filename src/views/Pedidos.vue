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
