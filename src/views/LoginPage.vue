<template>
  <div class="login">
    <div class="big-logo">
        <img src="../images/Logo-01.png"  />
    </div>

    <form>
        <div class="form-group">
            <input type="text" required v-model="userName"/><label>Username</label>
        </div>
        <div class="form-group">
            <input type="password" required v-model="password"/><label>Password</label>
        </div>
        <div class="buttons-login">
            <input type="button" value="Log in" @click="logIn"/>
            <input type="button" value="Register" @click="register"/>

        </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';

export default{
  data(){
        return{
            userName: "",
            password: ""
        }
    },
  
  methods: {
    ...mapActions(dataStore, ['fetchUserData', 'postUserData']),

    async logIn(){
      await this.fetchUserData(this.userName, this.password)
      if(this.userData.id){
        alert('Welcome!')
        this.$router.push('/home')
      }else{
        alert('Username or password incorrect')
      }
    },

    async register(){
      let email = prompt("Please enter your email address", "example@mail.com");
      await this.postUserData(this.userName, this.password, email)
    }
  }
  ,
  computed: {
        ...mapState(dataStore, ['userData','paypalOptions','creditCardOptions','orderRequest'])
  }
}

</script>

<style>
* {
    background-color: rgb(252, 253, 255);
}

    .login {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Verdana, sans-serif;
      background-color: #fcfcfc;
      flex-direction: column;
    }

    form {
      padding: 20px 40px;
    }

    .form-group {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      padding: 20px 0;
      width: 300px;
    }

    .form-group input {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #9e9e9e;
      color: #333;
      font-size: 16px;
      padding: 10px 0;
      display: block;
      width: 100%;
    }

    .form-group label {
      color: #9e9e9e;
      font-size: 16px;
      font-weight: 100;
      position: absolute;
      pointer-events: none;
      top: 0;
      transform: translateY(30px);
      transition: all 0.2s ease-in-out;
      left: 0px;
    }

    .form-group input:valid,
    .form-group input:focus {
      border-bottom-color: #0afab2;
      outline: none;
    }

    .form-group input:valid+label,
    .form-group input:focus+label {
      color: #0afab2;
      font-size: 14px;
      transform: translateY(0);
    }

    .buttons-login{
        /* box-sizing: border-box; */
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: space-evenly;
    }

    input[type="button"] {
      background-color: rgb(22, 142, 163);
      border: 2px solid rgb(22, 142, 163);
      border-radius: 20px;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      padding: 15px 0;
      width: 30%;
      align-items: center
      /* text-align: center; */
    }

    input[type="button"]:hover {
      background-color: #0dd89b;
      border: 2px solid #0dd89b;
    }

    input[type="button"]:active {
      border-color: #fff;
    }

    input[type="button"]:focus {
      outline: none;
    }
</style>