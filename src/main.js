// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from "./vuex.js";

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
Vue.use(Chartkick.use(Chart));

import './plugins/vuetify.js'
import Vuetify from "vuetify";

window.axios = require('axios');


import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.config.productionTip = false

const bcrypt = require('bcryptjs');

/* eslint-disable no-new */
const login = Vue.component('login', require('./components/auth/Login').default);
const registar = Vue.component('registar', require('./components/auth/Registar').default);


////ADICIONADO
const login2 = Vue.component('login2', require('./components/Login2').default);

const pedidos = Vue.component('pedidos', require('./components/Pedidos').default);
const nodes = Vue.component('nodes', require('./components/Nodes').default);
const namespaces = Vue.component('namespaces', require('./components/namespaces').default);
const clusterroles = Vue.component('clusterroles', require('./components/Clusterroles').default);

const persistentvolumes = Vue.component('persistentvolumes', require('./components/PersistentVolumes').default);

const cronjobs = Vue.component('cronjobs', require('./components/CronJobs').default);

const storageclasses = Vue.component('storageclasses', require('./components/StorageClasses').default);
const criacaoservico = Vue.component('criacaoservico', require('./components/CriacaoServico').default);


const daemonsets = Vue.component('daemonsets', require('./components/DaemonSets').default);
const deployments = Vue.component('deployments', require('./components/Deployments').default);
const jobs = Vue.component('jobs', require('./components/Jobs').default);
const pods = Vue.component('pods', require('./components/Pods').default);
const replicasets = Vue.component('replicasets', require('./components/ReplicaSets').default);
const replicationscontrollers = Vue.component('replicationscontrollers', require('./components/ReplicationsControllers').default);
const statefulsets = Vue.component('statefulsets', require('./components/StatefulSets').default);

const ingresses = Vue.component('ingresses', require('./components/Ingresses').default);
const services = Vue.component('services', require('./components/Services').default);
const persistentvolumeclaims = Vue.component('persistentvolumeclaims', require('./components/PersistentVolumeClaims').default);
const secrets = Vue.component('secrets', require('./components/Secrets').default);


const routes = [
  //////ADICIONADO
  {
    path:'/login',
    component:login2,
    name:'login2',
    meta: {
        requiresAuth: true
      }
  },



  {
      path:'/dashboard',
      component:pedidos,
      name:'pedidos',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/nodes',
      component:nodes,
      name:'nodes',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/namespaces',
      component:namespaces,
      name:'namespaces',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/clusterroles',
      component:clusterroles,
      name:'clusterroles',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/persistentvolumes',
      component:persistentvolumes,
      name:'persistentvolumes',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/cronjobs',
      component:cronjobs,
      name:'cronjobs',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/daemonsets',
      component:daemonsets,
      name:'daemonsets',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/deployments',
      component:deployments,
      name:'deployments',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/jobs',
      component:jobs,
      name:'jobs',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/pods',
      component:pods,
      name:'pods',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/ingresses',
      component:ingresses,
      name:'ingresses',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/services',
      component:services,
      name:'services',
      meta: {
          requiresAuth: true
        }
  },
  {
          path:'/criacaoservico',
          component:criacaoservico,
          name:'criacaoservico',
          meta: {
              requiresAuth: true
            }
      },
  {
      path:'/persistentvolumeclaims',
      component:persistentvolumeclaims,
      name:'persistentvolumeclaims',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/secrets',
      component:secrets,
      name:'secrets',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/replicasets',
      component:replicasets,
      name:'replicasets',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/replicationscontrollers',
      component:replicationscontrollers,
      name:'replicationscontrollers',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/statefulsets',
      component:statefulsets,
      name:'statefulsets',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/storageclasses',
      component:storageclasses,
      name:'storageclasses',
      meta: {
          requiresAuth: true
        }
  },
  {
      path:'/',
      component:login,
      name:'login',
      meta:{
          requiresGuest: false
      }
  },
  {
      path:'/registar',
      component:registar,
      name:'registar',
      meta:{
          requiresAuth: true
      }
  }
]

const router = new VueRouter({
  routes //equivale a routes:routes
})

const app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
  vuetify: new Vuetify({
      theme:{
          themes: {
              light: {
                  primary: '#3f51b5' ,
                  background: '#f5f5f5',
                  secondary: '#b0bec5',
                  accent: '#8c9eff',
                  error: '#b71c1c',
                  text: '#ffffff'
                },
              dark: {
                  primary: '#3f51b5',
                  background: '#121212',
                  secondary: '#000',
                  accent: '#8c9eff',
                  error: '#b71c1c',
                  text: '#808080'
                //here you will define primary secondary stuff for dark theme
              }
          },
          dark: true,
      },
  }),
  created(){
    this.$store.commit("loadTokenAndUserFromSession");
  },
  data: () => ({
      drawer: true,
  }),
});


router.beforeEach((to, from, next) => {
  if ((to.name == 'pedidos') || (to.name == 'nodes') || (to.name == 'namespaces') || (to.name == 'clusterroles') || (to.name == 'persistentvolumes') || (to.name == 'cronjobs') || (to.name == 'daemonsets') || (to.name == 'deployments') || (to.name == 'jobs') || (to.name == 'pods') || (to.name == 'ingresses') || (to.name == 'services') || (to.name == 'persistentvolumeclaims') || (to.name == 'secrets') || (to.name == 'replicasets') || (to.name == 'replicationscontrollers') || (to.name == 'statefulsets') || (to.name == 'storageclasses') ) {
      if (store.state.userLoged != 1) {
          next('/login');
          return;
      }
  }
  if((to.name == 'login2')){ 
    if (store.state.userLoged == 1) {
        next('/dashboard');
        return;
    }
  }

  if ((to.name == 'persistentvolumes') || (to.name == 'storageclasses') ||   (to.name == 'cronjobs') || (to.name == 'daemonsets') || (to.name == 'jobs') || (to.name == 'replicasets') || (to.name == 'replicationscontrollers') || (to.name == 'statefulsets') || (to.name == 'ingresses') || (to.name == 'persistentvolumeclaims') || (to.name == 'secrets')) {
      if (store.state.userLoged == 1 && store.state.pinLoged == 2) {
          next('/dashboard');
          return;
      }
  }

  if ((to.name == 'criacaoservico')){
    if(store.state.userLoged == 1 && store.state.pinLoged == 3){
        next('/dashboard');
        return;
    }
  }
  /*if((to.name == 'login2')){
    next('/dashboard');
  }*/

  
    next();
});

// Nav Guard
/*router.beforeEach((to, from, next) => {
  var sim= 1;
  console.log('1')
  console.log(app.$store.state.userLoged)
  // Check for requiresAuth guard
if (to.matched.some(record => record.meta.requiresAuth)) {
  // Check if NO logged user
  console.log('2')
  if (app.$store.state.userLoged != 1) {
    // Proceed to route
    console.log("firebase.auth().currentUser")
    console.log('3')
    next('/login');
    return;
  // Go to login
  /*next({
    path: '/login',
    query: {
      redirect: to.fullPath
    }
  });*/
  /*} else {
    next();

  }
} else if (to.matched.some(record => record.meta.requiresGuest)) {
  // Check if NO logged user
  if (app.$store.state.userLoged == 1) {
    next();

  } else {
    // Proceed to route
    // Go to login
    next({
      path:'/dashboard',
      query: {
        redirect: to.fullPath
      }
    });
  }
}
});*/









