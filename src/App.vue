<template>
  <div id="app">
    <div class="section-01">
      <img class="logo-ironhack" src="/src/images/Ironhack_logo.png">
      <img class="logo-menu" src="/src/images/Burger_menu.png">
    </div>

    <div class="section-02">
      <img class="logo-vue" src="/src/images/Vue_logo.png">
      <h1>Welcome to Vue.js</h1>
      <h2>Become a coding ninja with the fastest-growing JavaScript framework</h2>
      <img src="/src/images/Buttton shape.png">
      <h3 class="text-inside">Awesome</h3>
    </div>

    <div class="section-green">
      <div class="icon">
          <img src="/src/images/USP-1.png">
          <h4>Perfomant</h4>
          <p>Truly reactive, compiler-optimized rendering system that rarely requires manual optimization.</p>
      </div>
      <div class="icon">
          <img src="/src/images/USP-2.png">
          <h4>Approachable</h4>
          <p>Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation.</p>
      </div>
      <div class="icon">
          <img src="/src/images/USP-3.png">
          <h4>Versatile</h4>
          <p>A rich, incrementally adoptable ecosystem that scales </p>
      </div>
    </div>

  </div>
  
</template>

<script>

export default {
  name: 'app',
  }

</script>

<style>
.section-01 {
    background-color: rgb(255, 255, 255));
    padding-top: 50px;
    padding-bottom: 100px;
  }
.logo-ironhack {
    float: left;
    padding-top: 20px;
    padding-left: 100px;
    width: 40px;
  }

.logo-menu {
    float: right;
    padding-top: 20px;
    padding-right: 100px;
    width: 40px;
  }

.section-02 {
    background-color: rgb(255, 255, 255);
    height: 450px;
    margin: auto;
    text-align: center;
  }
.section-02 h1{
    font-size: 75px;
    text-align: center;
    padding-bottom: 0px;
  }
.section-02 h2{
    font-size: 20px;
    text-align: center;
    padding-top: 0px;
    padding: 0 500px;
  }
.logo-vue {
    float: center;
    padding-top: 20px;
    width: 130px;
  }

.text-inside{
  color: white;
  position: relative;
  top: -50px;
  left: 0px;
}

.section-green {
    background-color: #1EA758;
    color: rgb(0, 0, 0);
    height: 300px;
    bottom: -100px;
    margin: 0px;
    padding: 50px 50px;
    position: relative;
    text-align: center;
  }
.icon {
    box-sizing: border-box;
    float: left;
    padding: 0 100px;
    width: 33%;
  }

.icon img {
    height: 100px;
    width: 100px;
  }

.icon h4 {
    font-size: 30px;
    font-weight: bold;
  }
</style>