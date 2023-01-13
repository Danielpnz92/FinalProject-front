<template>
    <div class="order">
        <h2>This is your order</h2>
        <div class="listRestAndFood">
            <DropdownFood></DropdownFood>
            <DropdownPayment></DropdownPayment>
        </div>

        <div class="buttons-login">
            <input type="button" value="Checkout" @click="postOrder"/>

        </div>

        
    </div>
</template>

<script>
import DropdownFood from './DropdownFood.vue';
import DropdownPayment from './DropdownPayment.vue';
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';

export default{
    components: {
        DropdownFood,
        DropdownPayment
    },
    data(){
        return {
        restId:""
        }
    },
  async created(){
    const response = await fetch(`http://localhost:8080/plates/rest/${this.$route.params.restaurant}`);
    this.plates = await response.json();
    this.setSelectedPayment("");
    if(!this.cartFull){
      this.setCartFull()
    }
  },
  computed: {
        ...mapState(dataStore, ['cartFull','quantities','orderRequest','selectedPayment', 'previousOrder'])
  },
  methods: {
        ...mapActions(dataStore, ['setPlatesSet','setPlatesQuantity', 'postOrderData', 'fetchRestaurantById','setSelectedPayment', 'setCartFull', 'setPreviousOrder']),
    openListRest(){
        // this.$router.push('/home')
        this.listRest = this.zipCodeRest ? true : false
        this.setCartFull()
    },
    async postOrder(body){
        console.log(this.selectedPayment)
        if(this.selectedPayment.id){
            //Usuario previamente grabado en MakeOrder.vue
            // console.log(this.orderRequest.user)

            //Restaurante elegido
            await this.fetchRestaurantById(this.$route.params.restaurant)
            // console.log(this.orderRequest.restaurant)
            //Set de platos final

            let orderPlates = [];
            for(let i=0; i<this.quantities.length; i++){
              if(this.quantities[i]>0){
                orderPlates.push(this.plates[i])
              }
            }
            this.setPlatesSet(orderPlates)

            //Lista de cantidades final
            //he tenido que usar el stringify de JSON para poder acceder a los valores de las cantidades desde aquí, y rellenarlos en el objeto orden a subir
            let lista = JSON.stringify(this.quantities).slice(1,-1)
            let values= []
            for (let i = 0; i<lista.split(",").length; i++){
                console.log(lista.split(",")[i])
            values.push({
                    quantity: lista.split(",")[i]
                })
            }
            this.setPlatesQuantity(values)
            
            await this.postOrderData(this.orderRequest)
            this.$router.push('/home')
        }else{
            alert('Pick a payment system before proceeding')
        }
    }
  }
  
}
</script>

<style>


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
  /* width: 50%; */
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
  right: 4%;
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
  padding: 10px;
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
        padding: 20px;
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