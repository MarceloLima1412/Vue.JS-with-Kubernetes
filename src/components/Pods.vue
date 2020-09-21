<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="4000" top :color="typeMessage">
            <span>{{messageLogin}}</span>
            <v-btn @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-container class="my-5 teste">
            <v-data-table :headers="headers" :items="pods" :loading="loading" class="mt-10">
                <template v-slot:top>
                    <v-toolbar flat>
                        <h1 class="subheading grey--text">Pods</h1>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialogNewPod" max-width="700px">
                            <template v-slot:activator="{ on }" @click="moreInfo()">
                                <v-btn color="primary" dark class="mb-2" v-on="on">New Pod</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">New Pod</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form v-model="valid">
                                            <v-row>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-text-field v-model="novoPod.name" :rules="[v => !!v || 'Campo obrigatório']" label="Pod Name"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="6">
                                                    <v-combobox  v-model="novoPod.image" :items="images" :rules="[v => !!v || 'Campo obrigatório']" label="Escolha uma imagem" ></v-combobox >
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" :disabled="!valid" text @click="methodcriarPod">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-toolbar>
                    <v-dialog v-model="dialogMoreInfo" max-width="800px">
                      <v-card>
                          <v-card-title>
                              <span class="headline">Info Deployment</span>
                          </v-card-title>

                          <v-card-text>
                              <v-container>
                                <v-form>
                                  <v-row>
                                      <v-col cols="12" sm="6" md="12">
                                          <v-textarea v-model="moreinfoItem"></v-textarea>
                                      </v-col>
                                  </v-row>
                                </v-form>
                              </v-container>
                          </v-card-text>
                      </v-card>
                    </v-dialog>
                </template>
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:item.props="{ item }">
                    <v-chip :color="getColor(item.status)"></v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="moreInfo(item)">
                        mdi-magnify
                    </v-icon>
                    <v-icon v-if="$store.state.pinLoged != 3" small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>

    export default {
      name: 'pods',
      mounted() {
        console.log('~~~~~~~~~~~~~~~123~~~~~~~~~~');
      },
      data: () => ({
        pods: [],
        loading: true,
        typeMessage:'',
        snackbar: false,
        messageLogin: '',
        valid: true,
        moreinfoItem: '',
        novoPod: [],
        images:["nginx:1.14.2", "nginx:1.16.1","nginx:1.17.10","nginx:1.18.0"],
        dialogMoreInfo: false,
        dialogNewPod: false,
        moreinfoItem: '',
        headers: [
          {text: '', value: 'props'},
          { text: 'Nome', value: 'metadata.name' },
          { text: 'Namespace', value: 'metadata.namespace' },
          { text: 'Ip', value: 'status.podIPs[0].ip' },
          {text: 'Labels', value: 'metadata.labels.app'},
          { text: 'Node', value: 'spec.nodeName' },
          { text: 'Status', value: 'status2' },
          { text: 'Restarts', value: 'status.containerStatuses[0].restartCount' },
          {text: 'Created', value: 'diascriado' },
          {text: 'Actions', value: 'actions', sortable: false },
          
        ],
      }),
      methods:{
      },
      created(){
        var options = {
          headers:{ 
            'Content-Type' : 'application/yaml',
            'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
          }          
        };
        axios
            .get("http://192.168.1.64:8700/api/v1/namespaces/"+this.$store.state.nameSpace+"/pods",options)
            .then(response => {
            console.log(response.data.items);
            this.pods = response.data.items;
            this.loading = false
            for (const pod of this.pods){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()


              /*

              if(typeof (pod.status.containerStatuses[0].state.waiting.reason) !== 'undefined')
                Object.assign(pod, {status2: pod.status.containerStatuses[0].state.waiting.reason});
              else 
                Object.assign(pod, {status2: "Running"});

              */


              try{ 
                if(typeof (pod.status.containerStatuses[0].state.waiting.reason) !== 'undefined')
                  Object.assign(pod, {status2: pod.status.containerStatuses[0].state.waiting.reason});

                }
              catch(e) {
                  Object.assign(pod, {status2: "Running"});
              }





              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))
              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)
              Object.assign(pod, {diascriado: this.dhm(Date.now() - Date.parse(pod.metadata.creationTimestamp))});
            }
            })
            .catch(error => {
                console.log("Fail");
                console.log(error);
            });
      },
      computed: {
        
      },
      methods:{
        dhm(t){
            var cd = 24 * 60 * 60 * 1000,
                ch = 60 * 60 * 1000,
                d = Math.floor(t / cd),
                h = Math.floor( (t - d * cd) / ch),
                m = Math.round( (t - d * cd - h * ch) / 60000),
                pad = function(n){ return n < 10 ? '0' + n : n; };
          if( m === 60 ){
            h++;
            m = 0;
          }
          if( h === 24 ){
            d++;
            h = 0;
          }
          return [d+" dias", pad(h)+" horas", pad(m)+" minutos"].join(' ');
        },



        /*methodcriarPod(){
          const options = {
            headers:{ 'Content-Type' : 'application/yaml'}          
          }
          axios.delete('http://192.168.1.64:8700/api/v1/namespaces/default/pods/'+item.metadata.name,options)
          .then(response => { 
            this.messageLogin = 'Pod eliminado com sucesso';
            this.typeMessage = 'success';
            this.snackbar= true;
            this.dialogNewDeployment= false;

            apiVersion: v1
            kind: Pod
            metadata:
              name: private-reg
            spec:
              containers:
              - name: private-reg-container
                image: <your-private-image>
              imagePullSecrets:
              - name: regcred


          })
          .catch(error => {
              console.log(error)
              this.messageLogin = error.message;
              this.typeMessage = 'error';
              this.snackbar= true;
          });
          //console.log()
         // console.log(this.novoscaleDeployment.metadata.name)
        },*/

        close () {
          this.dialogNewPod = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
        methodcriarPod(){
          const options = {
            headers:{ 
              'Content-Type' : 'application/yaml',
              'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }       
          };
          const body=
            {
                "kind": "Pod",
                "metadata": {
                    "name": this.novoPod.name,
                    "labels": {
                      "app": this.novoPod.name
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "name": this.novoPod.name,
                            "image": this.novoPod.image,
                            "ports": [
                                {
                                    "containerPort": 82,
                                    "protocol": "TCP"
                                }
                            ]
                        }
                    ]
                }
            }
          axios.post('http://192.168.1.64:8700/api/v1/namespaces/'+this.$store.state.nameSpace+'/pods',body,options)
          .then(response => { 
            this.messageLogin = 'Pod criado com sucesso';
            this.typeMessage = 'success';
            this.snackbar= true;
            this.dialogNewPod= false;
            //this.getdeployments();
          })
          .catch(error => {
              console.log(error)
              this.messageLogin = error;
              this.typeMessage = 'error';
              this.snackbar= true;
          });
        },


        getColor (pros) {
          console.log(pros)
          if(pros.phase == 'Pending') return "red"
          if (pros.phase == "Running" && pros.conditions[1].status == 'False') return 'grey darken-1'
          else return 'green accent-4'
          
        },
        moreInfo (item) {
          this.moreinfoItem = Object.assign({}, item)
          var str = JSON.stringify(this.moreinfoItem);
          this.moreinfoItem = str
          this.dialogMoreInfo = true
          
          //console.log(str); // Logs output to dev tools console.
          //alert(str); // Displays output using window.alert()
        },
        deleteItem(item){
          const options = {
            headers:{ 
              'Content-Type' : 'application/yaml',
              'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }          
          }
          axios.delete('http://192.168.1.64:8700/api/v1/namespaces/'+this.$store.state.nameSpace+'/pods/'+item.metadata.name,options)
          .then(response => { 
            this.messageLogin = 'Pod eliminado com sucesso';
            this.typeMessage = 'success';
            this.snackbar= true;
            this.dialogNewDeployment= false;
          })
          .catch(error => {
              console.log(error)
              this.messageLogin = error.message;
              this.typeMessage = 'error';
              this.snackbar= true;
          });
          //console.log()
         // console.log(this.novoscaleDeployment.metadata.name)
        },
      },
    }
</script>
