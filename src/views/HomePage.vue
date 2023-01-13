<template>
  
      <header>
        <Navbar />
      </header>

      <router-view></router-view>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: 'app',
  components: {
    Navbar
  },
  data() {
    return {
      source: "", 
      dest: "", 
      date: "", 
      result: "",
      reload: false
    };
  },

  mounted(){
    //para que actualice la página con los estilos correspondientes, sin hacerlo no me cargaban bien
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
  },
  watch: {
    source(val, oldVal) {
      this.source = this.formatSym(val);
      //this.$set(this, "source", this.formatSym(val));
    },
    dest(val, oldVal) {
      //this.$set(this, "dest", this.formatSym(val));
      this.dest = this.formatSym(val);
    },
    date(val, oldVal) {
     // this.$set(this, "date", val);
      this.date = val.replace(/[^\d-]/g, "").slice(0, 10);
    }
  }
}
</script>

<style>
* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Verdana, sans-serif;

}
header {
  background-color: rgb(11, 175, 107);
  height: 87px;
  font-size: 15px
}
</style>