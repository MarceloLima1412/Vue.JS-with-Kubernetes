<template>
    <v-row justify="center">
        <v-snackbar v-model="snackbar" :timeout="4000" top :color="typeMessage">
            <span>{{messageRegisto}}</span>
            <v-btn  @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-layout justify-center  class="formRegistar">
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Registar</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Utilizador" v-model="email" name="login" prepend-icon="person" type="text"></v-text-field>
                            <v-text-field id="password" v-model="password" label="Password" name="password" prepend-icon="lock" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" v-on:click="registar" :loading="loading">Registar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-row>
</template>

<script>
    export default {
        name: 'registar',
        mounted() {
            console.log('Component mounteasdasdd.')
        },
        data: () => ({
            email:'',
            password:'',
            dialog: false,
            loading: false,
            snackbar: false,
            messageRegisto: '',
            typeMessage:'',
            loading: false,
        }),
        methods:{
            registar: function(e) {
                this.loading= true;
                firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log(user);
            //alert(`Account Created for ${user.email}`);
            this.typeMessage = 'success';
            this.loading= false;
            this.$router.push('/');
          },
          err => {
            this.loading= false;
            this.messageRegisto = err.message;
            this.typeMessage = 'error';
            this.snackbar= true;
          }
        );
      e.preventDefault();
    }
  }
};
</script>
<style>
  .formRegistar{
    margin-top: 10%;
  }
</style>