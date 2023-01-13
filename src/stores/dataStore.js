import {defineStore} from "pinia";

export default defineStore('dataStore', {
    state: () => ({
        restaurants: [],
        deliveryOrders: null,
        orderRequest:{
            restaurant: "",
            platesSet: [],
            user:{},
            platesQuantity: []
        },
        quantities: [],
        cartFull: false,
        previousOrder: false,
        platesList: [],
        userData: {},
        paypalOptions: [],
        selectedPayment:{},
        creditCardOptions: [],
        chosenRestaurant: 0,
        helpInfo:{}
    }),
    actions: {
        incrementArray(num){
            this.quantities = Array(num).fill(0);
        },
        setPreviousOrder(){
            this.previousOrder= this.previousOrder ? false : true
        },
        setPOrderquantities(list){
            this.quantities= list
        },
        setRest(num){
            this.chosenRestaurant=num;
        },
        setCartFull(){
            this.cartFull= this.cartFull ? false : true
        },
        setUser(user){
            this.orderRequest.user=user
        },
        setRestaurant(restaurant){
            this.orderRequest.restaurant=restaurant
        },
        setPlatesSet(platesSet){
            this.orderRequest.platesSet=platesSet
        },
        setPlatesQuantity(platesQuantity){
            this.orderRequest.platesQuantity=platesQuantity
        },
        setSelectedPayment(paySystem){
            this.selectedPayment={...paySystem}
        },
        

        
        async fetchOrdersbyUserId(id){
            try{
                const response = await fetch(`http://localhost:8080/orders/user/${id}`);
                this.deliveryOrders = await response.json();
            } catch (error) {
                console.log(error);
            }
        },
        
        async fetchRestaurantById(id){
            try{
                const response = await fetch(`http://localhost:8080/restaurant/${id}`);
                const restaurant = await response.json();
                this.setRestaurant(restaurant);
            } catch (error) {
                console.log(error);
            }
        },

        async fetchData(){
            try{
                const response = await fetch('http://localhost:8080/restaurant/all');
                this.restaurants = await response.json();

            } catch (error) {
                console.log(error);
            }
        },

        async fetchPaymentOptions(userId){
            try{
                const response = await fetch(`http://localhost:8080/paypal/user/${userId}`);
                this.paypalOptions= await response.json();

                const response2 = await fetch(`http://localhost:8080/creditCard/user/${userId}`);
                this.creditCardOptions = await response2.json();

            } catch (error) {
                console.log(error);
            }
        },
        async fetchUserDataById(id){
            try{
                const response = await fetch(`http://localhost:8080/user/${id}`);
                this.userData = await response.json();
                this.setUser(this.userData)

            } catch (error) {
                console.log(error);
            }
        },

        async fetchUserData(userName, userPass){
            try{
                const response = await fetch(`http://localhost:8080/user/${userName}/${userPass}`);
                this.userData = await response.json();
                localStorage.setItem("loggedUserId", this.userData.id)
                // localStorage.removeItem("loggedUserId")

            } catch (error) {
                console.log(error);
            }
        },

        async postUserData(name, password, email){
            try {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, password, email }),
                };
           
                await fetch(`http://localhost:8080/user/create`, requestOptions);
                alert("User registered succcesfully")
              } catch (error) {
                console.log(error);
              }
        },

        async postOrderData(orderRequest){
            try {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(orderRequest),
                };

                await fetch('http://localhost:8080/orders/create', requestOptions);
                alert("Order registered succcesfully")
              } catch (error) {
                console.log(error);
              }
        },

        async fetchHelpInfo(){
            try{
                const response = await fetch('http://localhost:8081/help/1');
                this.helpInfo = await response.json();

            } catch (error) {
                console.log(error);
            }
        }
    }
})