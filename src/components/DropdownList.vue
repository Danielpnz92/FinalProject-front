<template>  
      <div class="list-group">
        <div v-for="(rest, index) in restaurants" :key="index" >
          <div v-if="zipCode==rest.zipCode">
            <router-link class="list-group-item list-group-item-action" :to="`/order/${rest.id}`" @click="setRestId(rest.id)">
                <div class="restaurant-image">
                  <img :src="`/${rest.imageURL}`"/>
                </div>
                <div class="restaurant-desc">
                  <p>{{rest.name}}</p>
                  <p>{{rest.desc}}</p>
                  <p></p>
                  <img :src="`/src/images/${rest.rating}-stars.png`"/>
                </div>
            </router-link>
          </div>
        </div>
      </div>
    <div class="col-5" v-if="restaurants">
      <router-view />
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import dataStore from '@/stores/dataStore';


  export default {
    props: [
      'zipCode'
    ],
    
    async created(){
      await this.fetchData()
    },
  data(){
    return {
      quantity: 1
    }
  },
  computed: {
        ...mapState(dataStore, ['restaurants', 'chosenRestaurant'])
  },
  methods: {
        ...mapActions(dataStore, ['fetchData', 'setRest']),
        setRestId(num){
          this.setRest(num)
        }
  }
}
//   document.onscroll = () =>  {
//               var dropObj = document.getElementById("dropdownlist"); //to get dropdown list object
//               dropObj.ej2_instances[0].hidePopup(); // hide the popup using hidePopup method
//   };
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

.restaurant-image{
    height: 200px;
    display: flex;
    align-items: center;
    width: 50%;
}

.restaurant-image img{
  display: block;
  margin: 0 auto;
  max-width:100%;
  max-height:100%;
}
.restaurant-desc {
    height: 100px;
    width: 50%;
}
.restaurant-desc img{
    height: 30px;
    display: block;
    margin-left: auto;
}

.restaurant-desc p{
  background-color: white;
  color: black;

}

</style>