<template>  
  <div class="order-list">
    <div class="col-7" style="max-height: 90vh; overflow: scroll" v-if="deliveryOrders">
      <div class="list-group">
        <div v-for="(order, index) in deliveryOrders" :key="index" >
            <router-link class="list-group-item list-group-item-action" :to="`/checkout/${order.restaurant.id}`" @click="setPO(order.platesQuantity)">
                <div class="order-image">
                  <img :src="`/${order.restaurant.imageURL}`"/>
                </div>
                <div class="order-desc">
                  <h2>Delivery Order #{{order.id}}</h2>
                  <p>Date: {{order.creationDate.slice(0,10)}}</p>
                  <p>Time: {{order.creationDate.slice(11,19)}}</p>
                  <p>Restaurant: {{order.restaurant.name}}</p>
                </div>
            </router-link>
        </div>
      </div>
    </div>
    <div class="col-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';


  export default {
    
  data(){
    return {
      
    }
  },
  async created(){
    await this.fetchOrdersbyUserId(localStorage.getItem('loggedUserId'))
  },
  computed: {
        ...mapState(dataStore, ['deliveryOrders','previousOrder','quantities'])
  },
  methods: {
        ...mapActions(dataStore, ['fetchOrdersbyUserId','setPreviousOrder','setPOrderquantities']),

      setPO(list){
        if(!this.previousOrder){
          this.setPreviousOrder();
        }
        let lista = JSON.stringify(list)
        let values= []
        for (let i = 1; i<lista.split(":").length; i++){
          values.push(lista.split(":")[i][0])
        }
        localStorage.setItem("orderQuant", JSON.stringify(values))
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

</style>