<template>
    <v-navigation-drawer  v-model="nDrawer" app clipped>
      <v-list dense>
        <v-list-item v-for="separador in separadores" :key="separador.text" router :to="separador.route">
          <v-list-item-action>
            <v-icon>{{separador.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{separador.texto}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>




<script>
import firebase from 'firebase';
export default {
    name: 'navbar',
    props: ['drawer'],
    mounted() {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        Object.assign(this.nDrawer,this.drawer)
    },
    data: () => ({
      nDrawer: '',
      
  })
}
</script>
