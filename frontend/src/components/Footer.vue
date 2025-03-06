<template>
    <footer id="footer">
        <p>Make Your burger &copy; 2025</p>
    </footer>
</template>

<script>

    export default{
        name: "Footer"
    }

</script>

<style>



#footer {
    height: 100px;
    background-color: #222;
    border-top: 4px solid #0c0c0c;
    color: #ff9100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    font-weight: bold;
    text-align: center;
    text-shadow: 0px 0px 10px rgba(255, 166, 0, 0.5);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
}

p {
    background-color: #222 ;
}
</style>