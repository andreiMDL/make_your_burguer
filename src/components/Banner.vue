<template>
  <div id="main-banner">
    <h1>Make Your burger</h1>

  </div>
</template>

<script>
export default {
  name: "Banner"
}
</script>

<style scoped>
#main-banner {
  background-image: url("/public/img/burger.jpg");
  background-position: 100%;
  background-size: cover;
  height: 96vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-banner h1 {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: 3px solid #fcba03;
  border-left: 2px solid #222;
  margin-top: -100px;
  color: #fff;
  text-align: center;
  font-size: 60px;
  background-color: #222;
  padding: 20px 40px;
}

@media (max-width: 1061px) {
  #main-banner {
    background-position: right bottom;
    }
  }
</style>