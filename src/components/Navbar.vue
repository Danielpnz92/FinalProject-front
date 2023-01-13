<template>
    <nav>
        <DropdownMenu title="Options" :items="options">
            <ion-icon class="user-icon" name="person-circle-outline"></ion-icon>
        </DropdownMenu>
        <img class="logo-header" src="../images/Logo-01-02.png"  />

    </nav>


</template>
  
<script>
import DropdownMenu from './DropdownMenu.vue'

export default{
    name: 'navbar',
    components:{
        DropdownMenu
    },
    data(){
        return{
            options:[
                {
                    title: 'Make an order',
                    route: '/order'
                },
                {
                    title: 'My orders',
                    route: '/myorders'
                },
                {
                    title: 'Payment options',
                    route: '/paymentOptions'
                },
                {
                    title: 'Help',
                    route: '/help'
                },
                {
                    title: 'Log out',
                    route: '/'
                }
            ]
        }
    }
}
  
</script>
  
<style>
  nav {
    display: flex;
    /* align-items: left; */
    /* text-decoration: none; */
  }

  nav .logo-header{
    display: block;
    margin-top: 0px;
    margin-bottom: auto;
    margin-right: auto;
    height:80px;
    width: auto;
  }

  nav .user-icon{
    color: #fff;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    height: 40px;
    width: 40px;
  }

  nav .menu-item {
    color: #fff;
    margin-top:auto;
    margin-bottom: auto;
    /* margin-left: auto; */
    margin-right: auto;
    /* padding: -20px 20px; */
    text-align: center;
    display: flex;
    text-decoration: none;
    background-size: 100%;
  }

  nav .menu-item:hover {
    background-color: rgb(111, 222, 176);
  }


</style>