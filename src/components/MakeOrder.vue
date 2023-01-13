<template>

    <div class="order">
        <h2>Restaurants near you</h2>
        <div class="form-group">
            <input type="text" required v-model="zipCodeRest"/><label>zipCode</label>
        </div>
        <div class="buttons-login">
            <input type="button" value="Search" @click="openListRest"/>

        </div>
        <div class="listRestAndFood" v-if="listRest">
            <DropdownList :zipCode="zipCodeRest"></DropdownList>
        </div>

        
        <div class="checkout" v-if="cartContent">
          <router-link :to="`/checkout/${chosenRestaurant}`" @click="setCartFull">
            <ion-icon class="img-checkout" name="cart-outline"></ion-icon>
            <div class="count-cart" v-if="quantities.reduce((a, b) => a + b, 0)>0">
              <img class="img-count-cart" src="/src/images/count-cart.png"/>
              <div class="count-cart-number">{{ quantities.reduce((a, b) => a + b, 0) }}</div>
            </div>

          </router-link>
        </div>
        
    </div>
</template>

<script>
import Navbar from './Navbar.vue'
import DropdownList from './DropdownList.vue'
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';

export default{
components: {
    Navbar,
    DropdownList
  },
  async created(){
    await this.fetchUserDataById(localStorage.getItem('loggedUserId'));
    
    if(!this.cartFull){
      this.setCartFull()
    }

    if(this.previousOrder){
      this.setPreviousOrder()
    }
  },
  data(){
    return{
        zipCodeRest: "",
        listRest: false,
        listFood: false,
        cartContent: false,
        zipCodeRest: "",
        cart: []
    }
  },
  methods: {
    ...mapActions(dataStore, ['setCartFull', 'fetchUserDataById', 'setPreviousOrder']),
    openListRest(){
        this.listRest = this.zipCodeRest ? true : false
        this.setCartFull()
    }
  },
  computed: {
        ...mapState(dataStore, ['quantities','chosenRestaurant', 'cartFull', 'orderRequest', 'previousOrder'])
  },
  watch: {
      quantities() {
          this.cartContent = this.quantities.length>1 ? true : false
        }
    },
}
</script>

<style>

p{
    background-color: black;
    color: yellow;
}


.order{
    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: column;
    /* width: 30%; */
    padding-left: 30%;
    padding-right: 20px;
    margin: 10px;
}

.col-5 {
    flex: 0 0 auto;
    width: 50%;
}
/* .listRest{
  width: 50%;
} */

.listRestAndFood{
  display: flex;
  position: relative;
}
.checkout {
  position: relative;
}
.img-checkout{
  padding-top: 20px;
  height: 70px;
  width: 70px;
  display: block;
  margin-left: auto;
}
.count-cart {
  position: absolute;
  top: 5%;
  right: 2%;
}
.img-count-cart{
  height: 50px;
  width: 50px;
}
.count-cart-number{
  position: absolute;
  font-size: 25px;
  font-weight: bold;
  color: white;
  top: 14%;
  right: 32%;
}

.list-group {
  padding: 0px;
}

.form-group {
      position: relative;
      margin-right: auto;
      padding: 20px 20px;
      width: 335px;
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
      left: 20px;
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
        padding-left: 20px;
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