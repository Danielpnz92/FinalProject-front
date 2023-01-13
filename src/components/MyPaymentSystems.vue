<template>  
  <div class="order-list">
    <div class="col-7" style="max-height: 90vh; overflow: scroll">
      <DropdownPayment></DropdownPayment>
    </div>

    <div class="buttons-login">
          <input type="button" value="Add" @click="addMethod"/>
          <input type="button" value="Delete" @click="deleteMethod"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';
import DropdownPayment from './DropdownPayment.vue';


  export default {
    components: {
        DropdownPayment
    },
    
  data(){
    return {
      
    }
  },
  async created(){
    await this.fetchOrdersbyUserId(localStorage.getItem('loggedUserId'))
  },
  computed: {
        ...mapState(dataStore, ['deliveryOrders'])
  },
  methods: {
        ...mapActions(dataStore, ['fetchOrdersbyUserId']),
    addMethod(){

    },
    deleteMethod(){
      
    }
  }
}
//   document.onscroll = () =>  {
//               var dropObj = document.getElementById("dropdownlist"); //to get dropdown list object
//               dropObj.ej2_instances[0].hidePopup(); // hide the popup using hidePopup method
//   };
</script>

<style>
.order-list{
    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: column;
    /* width: 30%; */
    padding-left: 30%;
    padding-right: 20px;
    margin: 10px;
}

.col-7 {
    flex: 0 0 auto;
    width: 100%;
}

.list-group {
    padding: 20px;
}

.list-group-item.list-group-item-action{
    text-align: left;
    display: flex;
    height: fit-content;
    margin:0px
}

.order-image{
    height: 200px;
    display: flex;
    align-items: center;
    width: 50%;
}

.order-image img{
  display: block;
  margin: 0 auto;
  max-width:100%;
  max-height:100%;
}
.order-desc {
    height: 100px;
    width: 50%;
}
.order-desc img{
    height: 30px;
    display: block;
    margin-left: auto;
}

.order-desc p{
  background-color: white;
  color: black;

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