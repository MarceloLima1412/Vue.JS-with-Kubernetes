<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="4000" top :color="typeMessage">
            <span>{{messageLogin}}</span>
            <v-btn @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-container class="my-5 teste">
            <v-data-table :headers="headers" :items="replicasets" :loading="loading" class="mt-10">
                <template v-slot:top>
                    <v-toolbar flat>
                        <h1 class="subheading grey--text">Replica Sets</h1>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
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
                    <v-chip :color="getColor(item)"></v-chip>
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
      name: 'replicasets',
      mounted() {
        console.log('~~~~~~~~~~~~~~~123~~~~~~~~~~');
      },
      data: () => ({
        replicasets: [],
        loading: true,
        typeMessage:'',
        snackbar: false,
        moreinfoItem: '',
        dialogMoreInfo: false,
        messageLogin: '',
        moreinfoItem: '',
        headers: [
          {text: '', value: 'props'},
          {text: 'Nome', value: 'metadata.name'},
          {text: 'Namespace', value: 'metadata.namespace'},
          {text: 'Labels', value: 'spec.template.metadata.labels.app'},
          {text: 'Pods', value: 'status.replicas'},
          {text: 'Created', value: 'diascriado' },
          {text: 'Images', value: 'spec.template.spec.containers[0].name' },
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
            .get("http://192.168.1.64:8700/apis/apps/v1/namespaces/"+this.$store.state.nameSpace+"/replicasets",options)
            .then(response => {
            console.log(response.data.items);
            this.replicasets = response.data.items;
            this.loading = false
            for (const replicaset of this.replicasets){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()
              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))
              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)
              Object.assign(replicaset, {diascriado: this.dhm(Date.now() - Date.parse(replicaset.metadata.creationTimestamp))});
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
        getColor (pros) {
          if (pros.spec.template.spec.containers[0].imagePullPolicy == "IfNotPresent" ) return 'red'
          else if (pros.status.readyReplicas == undefined ) return 'grey'
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
          };
          const body=
            {
                "gracePeriodSeconds": 0,
                "orphanDependents": false
            }
          axios.delete('http://192.168.1.64:8700/apis/apps/v1/namespaces/namespace/replicasets/'+item.metadata.name,body,options)
          .then(response => { 
            this.messageLogin = 'Replica Set eliminado com sucesso';
            this.typeMessage = 'success';
            this.snackbar= true;
            this.dialogNewDeployment= false;
             this.getdeployments();
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