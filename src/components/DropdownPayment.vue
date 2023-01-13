<template>  

    <div class="list-group">

      <div v-for="(paypal, index) in paypalOptions" :key="index" class="list-group-item list-group-item-action">
        <PayOption  @payment-selected="paymentHandler" :paypal="paypal"/>
      </div>

      <div v-for="(creditCardOptions, index) in creditCardOptions" :key="index" class="list-group-item list-group-item-action">
        <PayOption  @payment-selected="paymentHandler" :creditCard="creditCardOptions"/>
      </div>
      
    </div>


  
</template>

<script>
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';
import PayOption from './PayOption.vue'


  export default {
    components: {
      PayOption
    },
  data(){
    return {
      plates: [],
      restId:""
    }
  },
  async created(){
    await this.fetchPaymentOptions(localStorage.getItem('loggedUserId'))
  },
  
  methods: {
        ...mapActions(dataStore, ['incrementArray','fetchPaymentOptions', 'setSelectedPayment']),

    paymentHandler(data) {
      this.setSelectedPayment(data);
      console.log(this.selectedPayment)
    }
  },
  computed: {
        ...mapState(dataStore, ['paypalOptions','creditCardOptions','selectedPayment'])
  },
}

</script>

<style>
.list-group {
    padding: 20px;
}

.list-group-item.list-group-item-action{
    text-align: left;
    display: flex;
    height: fit-content;
    margin:0px
}

.list-group-item.list-group-item-action::selection {
  color: rgb(0, 0, 0);
  background: rgb(134, 204, 77);
}

.paypal-image{
    height: 200px;
    display: flex;
    align-items: center;
    width: 50%;
}

.paypal-image img{
  display: block;
  margin: 0 auto;
  max-width:100%;
  max-height:100%;
}
.paypal-desc {
    height: 100px;
    width: 50%;
}
.paypal-desc img{
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