<template>
<v-container class="fill-height">
    <v-row justify="center" align="center">
        <v-snackbar v-model="snackbar" :timeout="4000" top :color="typeMessage">
            <span>{{messageLogin}}</span>
            <v-btn  @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-layout justify-center  class="formIniciarSessao">
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12"> 
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Iniciar Sessão</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text >
                            <!--<v-btn block class="mt-4" :loading="loading3" :disabled="loading3" color="red"  @click="loader = 'loading3'">
                                OpenStack
                                <v-icon right dark>kubernetes</v-icon>
                                <menu-icon />
                            </v-btn>-->
                        <v-text-field v-model="password" :type="show1 = 'password'" label="Pin"></v-text-field>
                        <v-btn block class="mt-7" color="blue" v-on:click.prevent="pin">
                            Login
                            <template v-slot:loader>
                            <span class="custom-loader">
                                <v-icon light>mdi-account</v-icon>
                            </span>
                            </template>
                        </v-btn>

                        <!--<v-btn block class="mt-7" color="blue" v-on:click.prevent="permitirLogin">
                            Permitir Login
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-account</v-icon>
                                </span>
                            </template>
                        </v-btn>-->

                        <!--<v-btn block class="mt-7" color="blue" v-on:click.prevent="login">
                            Login
                            <template v-slot:loader>
                                <span class="custom-loader">
                                    <v-icon light>mdi-account</v-icon>
                                </span>
                            </template>
                        </v-btn>-->
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-row>
</v-container>
</template>

<script>
    export default {
    name: 'login2',
    mounted() {
        //console.log('Component mounteasdasdd.')
        axios
            .get("http://192.168.1.64:7979/hashes")
            .then(response => {
                this.hashes = response.data;
            })
            .catch(error => {
                console.log("Fail");
                console.log(error);
            });
        //this.hash(this.pin1, this.pin2, this.pin3, this.pin4)
    },
    data: () => ({
        email:'',
        password:'',
        hashes: [],
        dialog: false,
        loading: false,
        snackbar: false,
        messageLogin: '',
        typeMessage:'',
        loading: false,
        aux: null,
        /*pin1: '123456',
        pin2: '234567',
        pin3: '345678',
        pin4: '456789',
        pin1Hash: '$2y$12$BpUEUPj5nj7LhFMGXavcoe4K8mYmMBV3YVfTM5t15SSk7.svF6/Fy',
        pin2Hash: '$2y$12$lBW0FJFMpDHWCuMykCOxhOmkEsDXKSX0B/8zVfUG4MGEMKFcjMA/q',
        pin3Hash: '$2y$12$FNfQnKMINKpzYdkP2DhFw.hgyHmBqNdn4oSYCRQu.jEcBpF.5q/7W',
        pin4Hash: '$2y$12$VsxYUGt8/zuw/GirBD1RAeg6ObF6HSuEiJZ/KxvL6F5BU2B11MlhO',*/
        pin1Hash: '',
        pin2Hash: '',
        pin3Hash: '',
        pin4Hash: '',
        pinAux: null
    }),
    methods:{
        /*hash(pin1, pin2, pin3, pin4){

            var bcrypt = require('bcryptjs');

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pin1, salt, (err, hash) => {
                    if(err) throw err;

                    this.pin1Hash = hash;
                    //console.log("teste")
                    //console.log(this.pin1Hash)
                })
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pin2, salt, (err, hash) => {
                    if(err) throw err;

                    this.pin2Hash = hash;
                    //console.log("teste")
                    //console.log(this.pin2Hash)
                })
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pin3, salt, (err, hash) => {
                    if(err) throw err;

                    this.pin3Hash = hash;
                    //console.log("teste")
                    //console.log(this.pin3Hash)
                })
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(pin4, salt, (err, hash) => {
                    if(err) throw err;

                    this.pin4Hash = hash;
                    //console.log("teste")
                    //console.log(this.pin4Hash)
                })
            });

        },*/
        pin(){

            let aux = false;
            let aux2 = false;
            let aux3 = false;
            let aux4 = false;

            var bcrypt = require('bcryptjs');

            console.log(this.hashes)
            bcrypt.compare(this.password, this.hashes[0], function(err, result) {
                // result == true
                aux = result
                console.log("result1")
                console.log(result)
            });

            bcrypt.compare(this.password, this.hashes[1], function(err, result) {
                // result == true
                aux2 = result
                console.log("result2")
                console.log(result)
            });

            bcrypt.compare(this.password, this.hashes[2], function(err, result) {
                // result == true
                aux3 = result
                console.log("result3")
                console.log(result)
            });

            bcrypt.compare(this.password, this.hashes[3], function(err, result) {
                // result == true
                aux4 = result
                console.log("result4")
                console.log(result)
            });

            setTimeout(() => {
                if(aux == true){
                    this.aux = 1;
                    this.pinAux = 1;
                    this.$store.commit("setUserLoged", this.aux);
                    this.$store.commit("setPin1HashLoged", this.hashes[0]);
                    this.$store.commit("setPinLoged", this.pinAux);
                    console.log("dawsdadw")
                    this.$router.push('/dashboard').catch(err =>{
                        console.log(err)
                    });
                }
                if(aux2 == true){
                    this.aux = 1;
                    this.pinAux = 2;
                    this.$store.commit("setUserLoged", this.aux);
                    this.$store.commit("setPin2HashLoged", this.hashes[1]);
                    this.$store.commit("setPinLoged", this.pinAux);
                    this.$router.push('/dashboard');
                }
                if(aux3 == true){
                    this.aux = 1;
                    this.pinAux = 3;
                    this.$store.commit("setUserLoged", this.aux);
                    this.$store.commit("setPin3HashLoged", this.hashes[2]);
                    this.$store.commit("setPinLoged", this.pinAux);
                    this.$router.push('/dashboard');
                }
                if(aux4 == true){
                    this.aux = 1;
                    this.pinAux = 4;
                    this.$store.commit("setUserLoged", this.aux);
                    this.$store.commit("setPin4HashLoged", this.hashes[3]);
                    this.$store.commit("setPinLoged", this.pinAux);
                    this.$router.push('/dashboard');
                }
                if(aux == false && aux == false && aux == false && aux == false){
                    this.messageLogin = 'Esse pin não existe!';
                    this.typeMessage = 'error';
                    this.snackbar= true;
                }
            }, 500);
        },
        permitirLogin(){
            this.aux = 1;
            this.$store.commit("setUserLoged", this.aux);
        },
        login() {
            console.log("userLoged")
            console.log(this.$store.state.userLoged)
            if(this.$store.state.userLoged != 1){
                //this.$toasted.error("Permita login primeiro!")
                this.messageLogin = 'Permita login primeiro!';
                this.typeMessage = 'error';
                this.snackbar= true;
            }else{
                console.log("teste")
                this.$router.push('/dashboard');
            }
        }
    }
};
</script>
<style>
</style>