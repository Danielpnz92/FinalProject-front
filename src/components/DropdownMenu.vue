<template>
    <div class="menu-item" @click="isOpen = !isOpen">
        <ion-icon class="user-icon" name="person-circle-outline"></ion-icon>
        <a href="#">
        </a>
        <transition name="fade" appear>
            <div class="sub-menu" v-if="isOpen">
                <div v-for="(item, index) in items" :key="index" class="menu-item">
                    <router-link :to="item.route">{{item.title}}</router-link>
                    <!-- <a :href="item.link">{{item.title}}</a> -->
                </div>
            </div>

        </transition>

    </div>

</template>

<script>
export default{
    name: 'dropdownMenu',
    props: [
        'title',
        'items'
    ],
    data(){
        return{
            isOpen: false
        }
    }
}

</script>

<style>

nav .menu-item {
    color: #fff;
    padding: 20px 20px;
    text-align: center;
    border-bottom: 7px solid transparent;
    display: flex;
    text-decoration: none;
    cursor: pointer;
  }
nav .menu-item .sub-menu{
    position: absolute;
    background-color: rgba(162, 153, 153, 0.619);
    
    margin-top: 67px;
    margin-left: -20px;
    position: absolute;
    /* transform: translateX(-100%); */
    width: 30%;
    /* padding-top: 100%; */
    padding-bottom: 100%;

}

.fade-enter-active ,
.fade-leave-active {
    /* transition: all .5s ease-out; */
    transition: all .5s ease-in;
    
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

</style>