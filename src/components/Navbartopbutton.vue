<template>
  <v-btn v-on:click="logout" :loading="loading" color="primary" v-show="this.$store.state.userLoged == '1' ">Sairsasdasd</v-btn>
</template>

<script>
    export default {
        name: 'navbartopbutton',
        mounted() {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        },
        data: () => ({
            loading: false,
            drawer:'',
            isLoggedIn: false,
            currentUser: false,
        }),
        methods:{
            logout: function(e) {
            this.loading= true;
            this.$store.commit("clearUserLoged");
            this.$router.push({ name: "login" });

        e.preventDefault();
        },
    }
}
</script>