<template>
    <div v-show="msg" class="message-container">
        <div class="toast">
          <p>{{ msg }}</p>
        </div>     
    </div>
  </template>
  
  <script>
    export default {
      name: "Message",
      props: {
        msg: String
      }
    }
  </script>
  
  <style scoped>
    .message-container {
    position: fixed;
    width: 100%;
    top: 20px;
    justify-content: center;
    }

    .toast {
      color: #004085;
      background-color: #cce5ff;
      border: 2px solid #b8daff;
      border-radius: 25px;
      padding: 20px;  
      max-width: 400px;
      margin: 50px auto;
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%)
    }

  </style>