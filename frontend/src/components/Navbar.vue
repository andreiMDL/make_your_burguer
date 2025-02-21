<template>
    <div id="nav">
    <router-link id="logo-url" to="/">
        <span id="logo-text">Make Your Burger</span>
    </router-link>
    
    <div id="divRoutes">
        <router-link to="/">Home</router-link> 
        <router-link @click="slideRight" to="/pedidos">Pedidos</router-link>
    </div>
</div>



</template>

<script>


export default {
    name: "Navbar",
    props: ["logo", "alt"]

    
}
</script>

<style scoped> 
    #nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 0.1% 1%;

    display: flex;
    justify-content: space-between; 
    align-items: center; 
    
}

#logo-url {
    text-decoration: none;
    transition:  .5s;
}

#logo-url :hover{
    transition:  .5s;
    color: #ffebb3;
    text-shadow: 0px 0px 20px rgba(243, 138, 10, 0.5);
}

#logo-text {
    color: #ff9100;
    font-family: "Marck Script", serif;
    font-size: 30px;
    text-shadow: 0px 0px 30px rgba(255, 166, 0, 0.5);
}


#nav a {
    font-weight: bold;
    color: #ff9100;
    text-decoration: none;
    margin: 0 15px;
    transition: 0.5s;
    padding: 10px;
}

#nav a:hover {
    color: #ffebb3;
    text-shadow: 0px 0px 20px rgba(243, 138, 10, 0.5);
}

#nav div {
    display: flex;
    align-items: center;
    gap: 20px; 
}

 .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>