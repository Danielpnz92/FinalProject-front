<template>  

    <div class="paypal-image" v-if="paypal">
      <img src="/src/images/paypal.png"/>
    </div>
    <div class="paypal-desc" v-if="paypal">
      <p>Paypal account #{{ paypal.id }}</p>
      <p>{{paypal.email}}</p>
      
      <div class="selectPay">
        <button @payment-selected="paymanetHandler" @click="selectPay('paypal')">Select</button>
      </div>
    </div>

    <div class="paypal-image" v-if="creditCard">
      <img src="/src/images/card.png"/>
    </div>
    <div class="paypal-desc" v-if="creditCard">
      <p>Credit Card #{{ creditCard.id }}</p>
      <p>{{creditCard.longNumber}}</p>
      <p>Expiration Date: {{creditCard.expirationDate.slice(0,10)}}</p>
      <div class="selectPay">
        <button @payment-selected="paymanetHandler" @click="selectPay('creditCard')">Select</button>
      </div>
    </div>

  
</template>

<script>
  export default {
    props: {
      paypal: {
      },
      creditCard: {
      }
    },
  
  methods: {
    selectPay(paySystem) {
      if(paySystem === "paypal"){
        let paypass = prompt("Please enter your Paypal password");
        if(paypass === this.paypal.payPassword){
          this.$emit("payment-selected", {...this.paypal})
        }else{
          alert('Password incorrect')
        }
      }else{
        let cvv = prompt("Please enter your CVV code");
        if(cvv === this.creditCard.cvv){
          this.$emit("payment-selected", {...this.creditCard})
        }else{
          alert('Code incorrect')
        }
      }

    },
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

.paypal-desc span{
    height: 30px;
    display: flex;
    align-items: left;
}

.paypal-desc p{
  background-color: white;
  color: black;
  display: flex

}

</style>