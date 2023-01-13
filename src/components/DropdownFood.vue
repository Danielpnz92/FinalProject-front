<template>  
    <div class="list-group">
      {{ resetTotal() }}
      <!-- Renderizado de lista de platos si viene de un pedido existente o en proceso (carrito lleno) -->
      <!-- En este caso el array de cantidades se rellena con los datos del pedido, ahora convertido en un proxy en vez de un array por ser un objeto OrderQuantity en el backend -->
          <div v-for="(plate, index) in plates" :key="index"  v-if="cartFull && previousOrder">
            <!-- {{ quantities[0].quantity }} -->
            <div class="list-group-item list-group-item-action" v-if="auxQuantities[index]>0">
              <div class="plate-image">
                <img :src="`/${plate.imageURL}`"/>
              </div>
              <div class="plate-desc">
                <p>{{plate.plateName}} --- {{ plate.price }} €</p>
                <p>Allergens: 
                  <span>
                    <img v-for="item in plate.allergens" :src="`/src/images/allergens/${item.allergen.toLowerCase()}.png`" >
                  </span>
                </p>
                <p>{{plate.plateDesc}}</p>
                <p></p>
                <div class="orderPlates">
                  <button @click="decrement(index)">&mdash;</button>
                  <input type="text" :value="auxQuantities[index]" readonly>
                    <button @click="increment(index)">&#xff0b;</button>
                </div>
              </div>
            
            </div>
            {{ sumTotal(plate.price*auxQuantities[index]) }}
          </div>



      <div v-for="(plate, index) in plates" :key="index"  v-if="cartFull && !previousOrder">
            <div class="list-group-item list-group-item-action" v-if="quantities[index]>0">
              <div class="plate-image">
                <img :src="`/${plate.imageURL}`"/>
              </div>
              <div class="plate-desc">
                <p>{{plate.plateName}} --- {{ plate.price }} €</p>
                <p>Allergens: 
                  <span>
                    <img v-for="item in plate.allergens" :src="`/src/images/allergens/${item.allergen.toLowerCase()}.png`" >
                  </span>
                </p>
                <p>{{plate.plateDesc}}</p>
                <p></p>
                <div class="orderPlates">
                  <button @click="decrement(index)">&mdash;</button>
                  <input type="text" :value="quantities[index]" readonly>
                    <button @click="increment(index)">&#xff0b;</button>
                </div>
              </div>
            
            </div>
            {{ sumTotal(plate.price*quantities[index]) }}
          </div>

          
<!-- Renderizado de lista de platos si el pedido aún no ha sido creado (carrito vacío) -->
          <div v-for="(plate, index) in plates" :key="index" class="list-group-item list-group-item-action" v-if="!cartFull">
            <div class="plate-image">
              <img :src="`/${plate.imageURL}`"/>
            </div>
            <div class="plate-desc">
              <p>{{plate.plateName}} --- {{ plate.price }} €</p>
              <p>Allergens: 
                <span>
                  <img v-for="item in plate.allergens" :src="`/src/images/allergens/${item.allergen.toLowerCase()}.png`" >
                </span>
              </p>
              <p>{{plate.plateDesc}}</p>
              <p></p>
              <div class="orderPlates">
                <button @click="decrement(index)">&mdash;</button>
                <input type="text" :value="quantities[index]" readonly>
                <button @click="increment(index)">&#xff0b;</button>
              </div>
            </div>
            {{ sumTotal(plate.price*quantities[index]) }}
        
          </div>

          <div class="sumTotal" v-if="plates">
            Order total: {{ sumPrices }} €
          </div>
    </div>

</template>

<script>
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';


  export default {
    
  data(){
    return {
      plates: [],
      restId:"",
      sumPrices: 0,
      auxQuantities: []
    }
  },
  async created(){
    if(this.cartFull){
      const response = await fetch(`http://localhost:8080/plates/rest/${this.$route.params.restaurant}`);
      this.plates = await response.json();
      this.auxQuantities = JSON.parse(localStorage.getItem("orderQuant"))
    }
  },
  watch: {
      '$route.params.restaurant': {
          async handler() {
            if (this.$route.params.restaurant && !this.cartFull) {
              console.log("cart empty")
                const response = await fetch(`http://localhost:8080/plates/rest/${this.$route.params.restaurant}`);
                this.plates = await response.json();
                this.incrementArray(this.plates.length);
                this.setRest(this.$route.params.restaurant)
            }
          },
          immediate: true
        }
    },
  methods: {
        ...mapActions(dataStore, ['incrementArray', 'setRest']),
    sumTotal(price){
      this.sumPrices += price
    },
    resetTotal(){
      this.sumPrices = 0
    },
    increment (index) {
      this.quantities[index]++;
      let i = 0;
      // for (const item in this.plates) {
      //   if(this.quantities[i]>0){
      //     this.cart.push()
      //   }
      // }
    },
    decrement (index) {
      if(this.quantities[index] === 0) {
        alert('Negative quantity not allowed')
      } else {
        this.quantities[index]--
      }
    },
    getAllergens(list){
      console.log(list)
      let result=""
      for (const item in list) {
        console.log(item.allergen)
        result += item.allergen + ", "
      }
      return result
    }
  },
  computed: {
        ...mapState(dataStore, ['quantities', 'cartFull', 'chosenRestaurant', 'previousOrder'])
  },
}
//   document.onscroll = () =>  {
//               var dropObj = document.getElementById("dropdownlist"); //toLowerCase().png get dropdown list object
//               dropObj.ej2_instances[0].hidePopup(); // hide the popup using hidePopup method
//   };
</script>

<style>
.sumTotal{
  text-align: right;
  font-size: 40px;
  color: forestgreen;
  padding: 20px;
}

input {
  width: 50%;
}
.list-group {
  width: fit-content;
    padding: 20px;
}

.list-group-item.list-group-item-action{
    text-align: left;
    display: flex;
    height: fit-content;
    margin:0px
}

.plate-image{
    height: 200px;
    display: flex;
    align-items: center;
    width: 50%;
}

.plate-image img{
  display: block;
  margin: 0 auto;
  max-width:100%;
  max-height:100%;
}
.plate-desc {
    height: 100px;
    width: 50%;
}
.plate-desc img{
    height: 30px;
    display: flex;
    align-items: left;
}

.plate-desc span{
    height: 30px;
    display: flex;
    align-items: left;
}

.plate-desc p{
  background-color: white;
  color: black;
  display: flex

}   

</style>