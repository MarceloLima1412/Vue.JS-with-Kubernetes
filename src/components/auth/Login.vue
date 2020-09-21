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
                        <v-toolbar-title>Projeto LTI</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text >
                            <!--<v-btn block class="mt-4" :loading="loading3" :disabled="loading3" color="red"  @click="loader = 'loading3'">
                                OpenStack
                                <v-icon right dark>kubernetes</v-icon>
                                <menu-icon />
                            </v-btn>-->

                            <v-btn block class="mt-7" color="blue" v-on:click="kubernetes">
                                Kubernetes
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                        <v-icon light>mdi-account</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                             <v-btn block class="mt-7" color="blue" v-on:click="openstack">
                                OpenStack
                                <template v-slot:loader>
                                    <span class="custom-loader">
                                        <v-icon light>mdi-account</v-icon>
                                    </span>
                                </template>
                            </v-btn>
                        </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-row>
</v-container>
</template>

<script>
    export default {
    name: 'login',
    mounted() {
        //console.log('Component mounteasdasdd.')
    },
    data: () => ({
        email:'',
        password:'',
        dialog: false,
        loading: false,
        snackbar: false,
        messageLogin: '',
        typeMessage:'',
        loading: false,
    }),
    methods:{
        kubernetes() {
            this.$router.push('/login');
            this.loading= true;
        },
        openstack() {
            window.location.href = 'http://lti_projeto_final.test/#/'; //alterar isto para o nome com que foi entregue
            this.loading= true;
        }
    }
};
</script>
<style>
</style>