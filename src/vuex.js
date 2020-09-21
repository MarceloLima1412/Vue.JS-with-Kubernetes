import Vue from 'vue';
import Vuex from 'vuex';

import Toasted from "vue-toasted";

Vue.use(Toasted, {
    position: "bottom-center",
    duration: 5000,
    type: "info"
}); 

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//import axios from "axios";
//import VueAxios from "vue-axios";

//axios.defaults.baseURL = "http://134.122.49.176";

//Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(BootstrapVue, IconsPlugin);

const store = new Vuex.Store({
    state: {
        token: sessionStorage.getItem("token") || null,
        userLoged: '',
        pinLoged: '',
        //pin2: '234567',
        //pin3: '345678',
        //pin4: '456789',
        pin1Hash: '',
        pin2Hash: '',
        pin3Hash: '',
        pin4Hash: '',
        nameSpace: null,
        /*proj: JSON.parse(sessionStorage.getItem("proj")) || {
            id: null,
            name: null,
        },
        projs:[],
        projetoNome: '',*/
        alert: {
            snackbar: null,
            color: '',
            text: ''

        }
    },

    mutations: {
        
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem("token", token);
            axios.defaults.headers.common.Authorization = "Bearer " + token;
        },
        /*setProj(state,proj){
            state.proj.id = proj.id;
            console.log("Name:");
            console.log(proj.name);
            state.proj.name = proj.name;
            sessionStorage.setItem("proj", JSON.stringify(proj));
        },*/
        setNameSpace(state,nameSpace){
            state.nameSpace = nameSpace;
            sessionStorage.setItem("nameSpace",nameSpace);
        },
        setUserLoged(state, userLoged) {
            console.log("user:")
            console.log(userLoged);
            state.userLoged = userLoged;
            sessionStorage.setItem("userLoged", JSON.stringify(userLoged));

        },
        clearUserLoged: state => {
            state.userLoged = null;
            state.pin1Hash = '';
            state.pin2Hash = '';
            state.pin3Hash = '';
            state.pin4Hash = '';
            state.pinLoged = '';
            //state.nameSpace = '';
            sessionStorage.removeItem("userLoged");
            sessionStorage.removeItem("pin1Hash");
            sessionStorage.removeItem("pin2Hash");
            sessionStorage.removeItem("pin3Hash");
            sessionStorage.removeItem("pin4Hash");
            sessionStorage.removeItem("pinLoged");
            //sessionStorage.removeItem("nameSpace");
        },

        setPinLoged(state, pinLoged) {
            console.log("pinLoged:")
            console.log(pinLoged);
            state.pinLoged = pinLoged;
            sessionStorage.setItem("pinLoged", JSON.stringify(pinLoged));

        },
        setPin1HashLoged(state, pin1Hash) {
            console.log("pin1Hash:")
            console.log(pin1Hash);
            state.pin1Hash = pin1Hash;
            sessionStorage.setItem("pin1Hash", JSON.stringify(pin1Hash));

        },
        setPin2HashLoged(state, pin2Hash) {
            console.log("pin2Hash:")
            console.log(pin2Hash);
            state.pin2Hash = pin2Hash;
            sessionStorage.setItem("pin2Hash", JSON.stringify(pin2Hash));

        },
        setPin3HashLoged(state, pin3Hash) {
            console.log("pin3Hash:")
            console.log(pin3Hash);
            state.pin3Hash = pin3Hash;
            sessionStorage.setItem("pin3Hash", JSON.stringify(pin3Hash));

        },
        setPin4HashLoged(state, pin4Hash) {
            console.log("pin4Hash:")
            console.log(pin4Hash);
            state.pin4Hash = pin4Hash;
            sessionStorage.setItem("pin4Hash", JSON.stringify(pin4Hash));

        },
        clearToken(state) {
            state.token = '';
            sessionStorage.removeItem("token");
            axios.defaults.headers.common.Authorization = undefined;
        },
        showError(state, message) {
            state.alert.snackbar = 'true';
            state.alert.color = 'error';
            state.alert.text = message;
            setTimeout(() => state.alert.snackbar = false, 6000);
        },
        showSuccess(state, message) {
            state.alert.snackbar = 'true';
            state.alert.color = 'success';
            state.alert.text = message;
            setTimeout(() => state.alert.snackbar = false, 6000);
        },
        loadTokenAndUserFromSession: state => {
            //state.token = '';
            state.userLoged = null;
            state.pinLoged = '';
            state.nameSpace = null;
            //let token = sessionStorage.getItem("token");
            let userLoged = sessionStorage.getItem("userLoged");
            let pinLoged = sessionStorage.getItem("pinLoged");
            let nameSpace = sessionStorage.getItem("nameSpace");
            /*if (token) {
                state.token = token;
                axios.defaults.headers.common.Authorization = "Bearer " + token;
            } else {
                axios.defaults.headers.common.Authorization = undefined;
            }*/
            if (userLoged) {
                state.userLoged = JSON.parse(userLoged);
            }
            if (pinLoged) {
                state.pinLoged = JSON.parse(pinLoged);
            }
            if (nameSpace) {
                state.nameSpace = nameSpace;
            }
        }

    },

});

export default store;
