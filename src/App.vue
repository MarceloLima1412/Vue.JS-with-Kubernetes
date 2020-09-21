<template>
    <div id="asd">
        <v-app id="inspire">
            <!--<v-navigation-drawer v-if="isLoggedIn" v-model="drawer" app clipped>-->
            <v-navigation-drawer v-model="drawer" app clipped v-show="this.$store.state.userLoged == '1' ">
                <v-list dense>
                    <v-list-item>
                        <v-list-item-action></v-list-item-action>
                        <v-list-item-content>
                            <h4>NameSpace</h4>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-select v-if="$store.state.pinLoged != 4" v-model="namespace" class :items="namespaces" label v-on:change="mudarNameSpace(namespace)">{{namespace}}</v-select>
                            <!-- pinLoged 4 equivale ao nivel 4-->
                            <v-select v-model="namespaceuser4" class :items="namespacesuser4"  v-else>{{namespaceuser4}}</v-select>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-for="separador in separadores" :key="separador.text" router :to="separador.route">
                        
                        <v-list-item-action>
                            <v-icon>{{separador.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{separador.texto}}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>

                    <v-menu down>
                        <template v-slot:activator="{ on }">
                            <v-btn text white v-on="on">Cluster</v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="clus in cluster" :key="clus.text" router :to="clus.route" @click>
                                <v-list-item-title>{{ clus.texto }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <br />
                    <br />
                    <v-menu down>
                        <template v-slot:activator="{ on }">
                            <v-btn text white v-on="on">Workloads</v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="workload in workloads" :key="workload.text" router :to="workload.route" @click>
                                <v-list-item-title>{{ workload.texto }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <br />
                    <br />
                    <v-menu down>
                        <template v-slot:activator="{ on }">
                            <v-btn text white v-on="on">Services</v-btn>
                        </template>
                        <v-list v-if="$store.state.pinLoged != 3">
                            <v-list-item v-for="service in services" :key="service.text" router :to="service.route" @click>
                                <v-list-item-title>{{ service.texto }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        <v-list v-else>
                            <v-list-item v-for="service in services3" :key="service.text" router :to="service.route" @click>
                                <v-list-item-title>{{ service.texto }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <v-menu v-if="$store.state.pinLoged != 2" down>
                        <!-- pinLoged = 2 correponde ao segundo pin, segundo nivel-->
                        <template v-slot:activator="{ on }">
                            <v-btn text white v-on="on">More Options</v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="more in mores" :key="more.text" router :to="more.route" @click>
                                <v-list-item-title>{{ more.texto }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list>
            </v-navigation-drawer>

            <!--<v-app-bar v-if="isLoggedIn" app clipped-left>-->
            <v-app-bar app clipped-left v-show="this.$store.state.userLoged == '1' ">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <img class="br-9" src="https://img.icons8.com/color/48/000000/kubernetes.png" />
                <v-toolbar-title>Kubernetes</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn v-on:click="logout" :loading="loading" color="primary" v-show="this.$store.state.userLoged == '1' ">Sair</v-btn>
            </v-app-bar>

            <v-content class="background">
                <router-view />
            </v-content>
            <v-footer app>
                <span>&copy; 2020</span>
            </v-footer>
        </v-app>
    </div>
</template>


<script>
import firebase from "firebase";

import Navbar from "./components/Navbar";
import NavbarTopButton from "./components/Navbartopbutton";
export default {
  name: "App",
  components: {
    Navbar,
    NavbarTopButton
  },
  data: () => ({
    drawer: false,
    isLoggedIn: false,
    currentUser: false,
    loading: false,
    namespace: "default",
    namespaces: [],
    namespaceuser4: 'default',
    namespacesuser4: ['default'],
    separadores: [
      { icon: "layers", texto: "Overview", route: "/dashboard" },
      { divider: true },
      
     
      /*{ icon: "adjust", texto: "Nodes", route: "/nodes" },
      { icon: "block", texto: "Namespaces", route: "/namespaces" },
      { icon: "list", texto: "Cluster roles", route: "/clusterroles" },
      { divider: true },
      //{ icon: 'people', texto: 'Registar', route: '/registar' },

      
      { icon: "list", texto: "Deployments", route: "/deployments" },
      { icon: "list", texto: "Pods ", route: "/pods" },
      { divider: true },*/
      
      //{ icon: "list", texto: "Services", route: "/services" },
      //{ divider: true },

    


    
    ],

    cluster:[
      { icon: "adjust", texto: "Nodes", route: "/nodes" },
      { icon: "block", texto: "Namespaces", route: "/namespaces" },
      { icon: "list", texto: "Cluster roles", route: "/clusterroles" },
      //{ divider: true },
    ],

    workloads:[
      { icon: "list", texto: "Deployments", route: "/deployments" },
      { icon: "list", texto: "Pods ", route: "/pods" },
      //{ divider: true },
    ],

    services:[
      { icon: "list", texto: "Services", route: "/services" },
      { icon: "list", texto: "Criação de serviço", route: "/criacaoservico" },
      //{ divider: true },
    ],

    services3:[
      { icon: "list", texto: "Services", route: "/services" },
      //{ divider: true },
    ],

    mores: [
    
      {
        icon: "list",
        texto: "Persistent Volumes",
        route: "/persistentvolumes"
      },
      { icon: "list", texto: "Storage Classes", route: "/storageclasses" },

      { icon: "list", texto: "Cron Jobs", route: "/cronjobs" },
      { icon: "list", texto: "Daemon Sets", route: "/daemonsets" },
      { icon: "list", texto: "Jobs ", route: "/jobs" },
      { icon: "list", texto: "Replica Sets ", route: "/replicasets" },
      {
        icon: "list",
        texto: "Replications Controllers ",
        route: "/replicationscontrollers"
      },
      { icon: "list", texto: "Stateful Sets ", route: "/statefulsets" },
      { icon: "list", texto: "Ingresses", route: "/ingresses" },

      {
        icon: "list",
        texto: "Persistent Volume Claims",
        route: "/persistentvolumeclaims"
      },
      { icon: "list", texto: "Secrets", route: "/secrets" }
    ]
  }),
  methods: {
    loadNamespaces(){
        var options = {
          headers:{ 
            'Content-Type' : 'application/yaml',
            'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
          }          
        };
        axios
        .get("http://192.168.1.64:8700/api/v1/namespaces",options) 
        .then(response => {
        //console.log(response.data.items);
        //this.namespaces = response.data.items;


        //console.log("response.data.items");
        //console.log(response.data.items);
        /*this.namespaces = response.data.items.map(namespace => ({
          return {text: "namespace"}
          //value: { name: namespace.metadata.name, id: namespace.metadata.uid }
        }));*/

        this.namespaces = response.data.items.map(function(val, index){
            return val.metadata.name; 
        })

        //console.log("namespaces")
        //console.log(this.namespaces)



        })
        .catch(error => {
            console.log("Fail");
            console.log(error);
        });
        //console.log("this.namespaces")
      //console.log(this.namespaces)
    },
    logout: function(e) {
        this.$store.commit("clearUserLoged");
        this.$router.push({ name: "login" });

    e.preventDefault();
    },
    mudarNameSpace(namespace) {
      console.log(namespace);
      this.$store.commit("setNameSpace", namespace);
      
      if(this.$router.currentRoute.fullPath != "/dashboard")
      {
        this.$router.push('/dashboard')
      }
      else{
        location.reload();
      }
      
      //location.reload();
    }
  },
  /*created(){
    //this.loadNamespaces();

  },*/
  mounted() {
    //this.loadProjectos();
    this.loading = false;
    this.loadNamespaces();
    setTimeout(() => {
      console.log("this.namespaces");
      console.log(this.namespaces);
      if(this.$store.state.pinLoged != 4){
        this.$store.commit("setNameSpace", this.namespaces[0]);
      }
      else{
        this.$store.commit("setNameSpace", this.namespacesuser4[0]);
      }

    }, 500);

  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
