<template>
    <router-view></router-view>
  
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';
// import LoginPage from "./components/LoginPage.vue";
  
export default {
  name: 'app',
  components: {
    Navbar,
    // LoginPage
  },
  data() {
    return {
      source: "", 
      dest: "", 
      date: "", 
      result: "",
      logged: true
    };
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
  },
  computed: {
        ...mapState(dataStore, ['restaurants','users'])
      },
  methods: {
        ...mapActions(dataStore, ['fetchUsers'])
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
  font-size: 25px
}
</style>