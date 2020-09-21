<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="4000" top :color="typeMessage">
            <span>{{messageLogin}}</span>
            <v-btn @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-container class="my-5 teste">
            <v-data-table :headers="headers" :items="deployments" :loading="loading" class="mt-10">
                <template v-slot:top>
                    <v-toolbar flat>
                        <h1 class="subheading grey--text">Deployments</h1>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogNewDeployment" max-width="700px">
                            <template v-slot:activator="{ on }" @click="moreInfo()">
                                <v-btn color="primary" dark class="mb-2" v-on="on">New Deployment</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">New Deployment</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form v-model="valid">
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="novoDeployment.name" :rules="[v => !!v || 'Campo obrigatório']" label="Deployment Name"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="novoDeployment.replicas" :rules="[v => !!v || 'Campo obrigatório']" label="Replicas"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-combobox  v-model="novoDeployment.image" :items="images" :rules="[v => !!v || 'Campo obrigatório']" label="Escolha uma imagem" required></v-combobox >
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" :disabled="!valid" text @click="methodcriarDeployment">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogMoreInfo" max-width="800px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Info Deployment</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form v-model="valid1">
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

                        <v-dialog v-model="dialogScaleDeployment" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Scale Deployment</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form v-model="valid1">
                                            <v-row>
                                                <v-text-field :rules="[v => !!v || 'Campo obrigatório']" v-model="novoscaleDeployment.status.replicas" label="Replicas"></v-text-field>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" :disabled="!valid1" text @click="methodscaleDeployment">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>


                        <v-dialog v-model="dialogNovoServico" max-width="500px">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">New Service</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-form v-model="valid2">
                                          <v-row>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-text-field :rules="[v => !!v || 'Campo obrigatório']" v-model="novoServico.nome" label="Nome"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="6">
                                                <v-text-field v-model="novoServico.porto" :rules="[v => !!v || 'Campo obrigatório']" label="Porto"></v-text-field>
                                            </v-col>
                                          </v-row>
                                        </v-form>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" :disabled="!valid2" text @click="methodCriarService">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>


                    </v-toolbar>
                </template>

                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:item.props="{ item }">
                    <v-chip :color="getColor(item.status.conditions[0])"></v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon v-if="$store.state.pinLoged != 3" small class="mr-2" @click="scaleDeployment(item)">
                        mdi-arrow-all
                    </v-icon>
                    <v-icon v-if="$store.state.pinLoged != 3" small class="mr-2" @click="criarServico(item)">
                        mdi-plus
                    </v-icon>
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
      name: 'deployments',
      mounted() {
        console.log('~~~~~~~~~~~~~~~123~~~~~~~~~~');
      },
      data: () => ({
        deployments: [],
        loading: true,
        headers: [
          {text: '', value: 'props'},
          {text: 'Nome', value: 'metadata.name'},
          {text: 'Namespace', value: 'metadata.namespace'},
          {text: 'Labels', value: 'spec.template.metadata.labels.app'},
          {text: 'Pods', value: 'status.replicas'},
          {text: 'Created', value: 'diascriado' },
          {text: 'Images', value: 'spec.template.spec.containers[0].image' },


          {text: 'Actions', value: 'actions', sortable: false },

        ],
        images:["nginx:1.14.2", "nginx:1.16.1","nginx:1.17.10","nginx:1.18.0"],



        snackbar: false,
        messageLogin: '',
        moreinfoItem: '',
        valid: true,
        valid1: true,
        valid2: true,
        dialogScaleDeployment: false,
        dialogNovoServico: false,
        dialogMoreInfo: false,
        dialogNewDeployment: false,
        defaultItem: {},

        novoDeployment: {},
        novoscaleDeployment: {status:{replicas:''}, metadata:{name:''}},
        typeMessage:'',
        novoServico:'',

        infoDeploymentParaCriarServico: '',
        targetPortoNovoServico: '',





      }),
      methods:{
      },
      created(){
        this.getdeployments();
      },
      computed: {
        
      },
      methods:{




        scaleDeployment (item) {
          this.editedIndex = this.deployments.indexOf(item)
          this.novoscaleDeployment = Object.assign({}, item)
          this.dialogScaleDeployment = true
          console.log("item")
          console.log(item.status.replicas)
        },


        criarServico (item) {
          this.infoDeploymentParaCriarServico = item
          this.editedIndex = this.deployments.indexOf(item)
          this.novoServico = Object.assign({}, item)
          this.dialogNovoServico = true
        },


        moreInfo (item) {
          this.moreinfoItem = Object.assign({}, item)
          var str = JSON.stringify(this.moreinfoItem);
          this.moreinfoItem = str
          this.dialogMoreInfo = true
          
          //console.log(str); // Logs output to dev tools console.
          //alert(str); // Displays output using window.alert()
        },

        close () {
          this.dialogScaleDeployment = false
          this.dialogNewDeployment = false
          this.dialogMoreInf = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
        getdeployments(){
          var options = {
            headers:{ 
              'Content-Type' : 'application/yaml',
              'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }          
            };
            axios
            .get("http://192.168.1.64:8700/apis/apps/v1/namespaces/"+this.$store.state.nameSpace+"/deployments",options)
            .then(response => {
            console.log("FEITO!!!!!!!!!");
            console.log(response.data.items);
            this.deployments = response.data.items;
            this.loading = false
            for (const deployment of this.deployments){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()
              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))
              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)
              Object.assign(deployment, {diascriado: this.dhm(Date.now() - Date.parse(deployment.metadata.creationTimestamp))});
            }
            })
            .catch(error => {
                console.log("Fail");
                console.log(error);
            });
        },

        
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
          if(pros.type == "Progressing")return 'grey'
          else if (pros.status == 'True') return 'green accent-4'
          else return 'red'
        },

      methodCriarService(){
        console.log("this.infoDeploymentParaCriarServico.spec.template.spec.containers[0].image")
        console.log(this.infoDeploymentParaCriarServico.spec.template.spec.containers[0].image)
        if(this.infoDeploymentParaCriarServico.spec.template.spec.containers[0].image.includes("redis")){
          this.targetPortoNovoServico = 6379
        } else if(this.infoDeploymentParaCriarServico.spec.template.spec.containers[0].image.includes("memcached")){
          this.targetPortoNovoServico = 11211
        }else if(this.infoDeploymentParaCriarServico.spec.template.spec.containers[0].image.includes("rabbitmq")){
          this.targetPortoNovoServico = 5672
        }else{
          this.targetPortoNovoServico = 80
        }
        const options = {
          headers:{ 
            'Content-Type' : 'application/yaml',
            'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
          }        
        };
        const body=
        {
            "kind": "Service",
            "apiVersion": "v1",
            "metadata": {
                "name": this.novoServico.nome,
            },
            "spec": {
                "ports": [
                    {
                        "port": parseInt(this.novoServico.porto),
                        "targetPort": parseInt(this.targetPortoNovoServico)
                    }
                ],
                "selector": {
                    "app": this.novoServico.metadata.name,
                },
                "type": "LoadBalancer",
            }
        }
        axios.post("http://192.168.1.64:8700/api/v1/namespaces/"+this.$store.state.nameSpace+"/services",body,options)
        .then(response => { 
          this.messageLogin = 'Serviço criado com sucesso';
          this.typeMessage = 'success';
          this.snackbar= true;
          this.dialogNovoServico= false;
        })
        .catch(error => {
            console.log(error)
            this.messageLogin = error.message;
            this.typeMessage = 'error';
            this.snackbar= true;
        });
      },



        /*methodcriarDeployment(){
          console.log(this.novoDeployment.image)
        },*/
        methodcriarDeployment(){
          const options = {
            headers:{ 
            'Content-Type' : 'application/yaml',
            'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
          }          
          };
          const body=
            {
                "kind": "Deployment",
                "apiVersion": "apps/v1",
                "metadata": {
                    "name": this.novoDeployment.name
                },
                "spec": {
                    "replicas": parseInt(this.novoDeployment.replicas),
                    "revisionHistoryLimit": 10,
                    "selector": {
                        "matchLabels": {
                            "app": this.novoDeployment.name
                        }
                    },
                    "template": {
                        "metadata": {
                            "labels": {
                                "app": this.novoDeployment.name
                            }
                        },
                        "spec": {
                            "containers": [
                                {
                                    "name": this.novoDeployment.name,
                                    "image": this.novoDeployment.image,
                                    /*"ports": [
                                        {
                                            "containerPort": 82,
                                            "protocol": "TCP"
                                        }
                                    ]*/
                                }
                            ]
                        }
                    }
                }
            }
          axios.post("http://192.168.1.64:8700/apis/apps/v1/namespaces/"+this.$store.state.nameSpace+"/deployments",body,options)
          .then(response => { 
            this.messageLogin = 'Deployment criado com sucesso';
            this.typeMessage = 'success';
            this.snackbar= true;
            this.dialogNewDeployment= false;
            this.getdeployments();
          })
          .catch(error => {
              console.log(error)
              this.messageLogin = error;
              this.typeMessage = 'error';
              this.snackbar= true;
          });
          //console.log()
         // console.log(this.novoscaleDeployment.metadata.name)
        },


        deleteItem(item){
          const options = {
            headers:{ 
            'Content-Type' : 'application/yaml',
            'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
          }         
          };
          const body=[
            {
                "gracePeriodSeconds": 0,
                "orphanDependents": false
            }
          ]
          axios.delete("http://192.168.1.64:8700/apis/apps/v1/namespaces/"+this.$store.state.nameSpace+"/deployments/"+item.metadata.name,options)
          .then(response => { 
            this.messageLogin = 'Deployment eliminado com sucesso';
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

        methodscaleDeployment(){
          const options = {
            headers:{ 
            'Content-Type' : 'application/json-patch+json',
            'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
          }         
          };
          const body=
            [
              {
                "op":"replace",
                "path":"/spec/replicas",
                "value": parseInt(this.novoscaleDeployment.status.replicas)
              }
            ]
          axios.patch('http://192.168.1.64:8700/apis/apps/v1/namespaces/'+this.$store.state.nameSpace+'/deployments/'+this.novoscaleDeployment.metadata.name+'/scale',body,options)
          .then(response => { 
            this.messageLogin = 'Scale feito com sucesso';
            this.typeMessage = 'success';
            this.snackbar= true;
            this.dialogScaleDeployment= false;
          })
          .catch(error => {
              console.log(error)
              this.messageLogin = error.message;
              this.typeMessage = 'error';
              this.snackbar= true;
          });
          //console.log()
         // console.log(this.novoscaleDeployment.metadata.name)
        }


        /*this.messageLogin = 'Serviço criado com sucesso';
        this.typeMessage = 'success';
        this.snackbar= true;

        this.messageLogin = error.response;
        this.typeMessage = 'error';
        this.snackbar= true;



        this.messageLogin = 'Deployment criado com sucesso';
        this.typeMessage = 'success';
        this.snackbar= true;

        this.messageLogin = error.response;
        this.typeMessage = 'error';
        this.snackbar= true;*/


      },
      getPodPort(ip){

          axios.get("http://192.168.1.64:7979/port"+ip)
          .then(response => { 
            console.log(response.data)
          })
          .catch(error => {
              console.log(error)
          });
          //console.log()
         // console.log(this.novoscaleDeployment.metadata.name)
        },


      mounted() {
        this.getdeployments();
      },
    }
/*[
  {
    "op":"replace",
    "path":"/spec/replicas",
    "value":3
  }
]*/
</script>

