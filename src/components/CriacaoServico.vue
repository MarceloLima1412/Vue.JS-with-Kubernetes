<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="10000" top :color="typeMessage">
            <span>{{messageLogin}}</span>
            <v-btn @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>
        <v-container class="my-5 teste">
            <h1 class="subheading grey--text mb-10">Que serviço pretende criar</h1>
            <v-layout row warp>
                <v-flex xs12 sm5 md4 lg3 v-for="servico in servicos" :key="servico.id">
                    <v-container>
                        <v-card class="ml-7 mb-5" max-width="300" @click="criarServico(servico)">
                            <v-img class="white--text align-end" height="200px" :src="servico.imagem"> </v-img>

                            <v-card-text class="text--primary">
                                <div>{{servico.nome}}</div>
                            </v-card-text>
                        </v-card>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-dialog v-model="dialogCriarServico" max-width="800px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Criar servico</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form v-model="valid">
                                <v-row>
                                    <v-col cols="12" sm="6" md="5">
                                        <v-text-field v-model="novoServico.name" :rules="[v => !!v || 'Campo obrigatório']" label="Nome serviço"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="7">
                                        <v-select  v-model="novoServico.tipodisp" :items="disponibilidade" :rules="[v => !!v || 'Campo obrigatório']" label="Pretende um serviço com:" required></v-select >
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" :disabled="!valid" text @click="methodCriarServico">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>



<script>

    export default {
      name: 'nodes',
      mounted() {
        console.log('~~~~~~~~~~~~~~~123~~~~~~~~~~');
      },
      data: () => ({
        nodes: [],
        loading: true,
        typeMessage:'',
        dialogCriarServico: false,
        snackbar: false,
        disponibilidade:["Alta disponibilidade", "Média disponibilidade","Baixa disponibilidade"],
        messageLogin: '',
        valid: true,
        servicoImagem: '',
        novoServico: {},
        nomeServicoRecuperado: '',
        novoServicoImagem: '',
        servicos: [
          { nome: 'Nginx', porto: 80,info: 'nginx:latest',          imagem: 'https://kinsta.com/pt/wp-content/uploads/sites/3/2019/02/o-que-e-o-nginx-1024x512.png' },
          { nome: 'Mongo DB', porto: 80,info: 'mongo:latest',          imagem: 'https://pplware.sapo.pt/wp-content/uploads/2017/04/1.jpeg' },
          //{ nome: 'Node js', info: 'node:13.14.0-buster',              imagem: 'https://pplware.sapo.pt/wp-content/uploads/2019/10/nodejs_capa-720x376.jpg' },
          { nome: 'Redis', porto: 6379,info: 'redis:latest',             imagem: 'https://ps.w.org/redis-cache/assets/banner-1544x500.png?rev=1025599' },
          { nome: 'Memcached', porto: 11211,info: 'memcached:latest',       imagem: 'https://miro.medium.com/max/1200/0*1nDqtOhahSgSFh3Z' },
          { nome: 'Friendica', porto: 80,info: 'friendica:latest',               imagem: 'https://d2.alternativeto.net/dist/s/friendika_681264_full.png?format=jpg&width=1600&height=1600&mode=min&upscale=false' },
          //{ nome: 'Debian', info: /*debian:<suite>-slim*/'debian:latest', imagem: 'https://i.pinimg.com/originals/86/cb/21/86cb216b384d15999e65e3fd1e54d444.jpg' },
          { nome: 'Apache', porto: 80,info: 'httpd:latest',              imagem: 'https://www.looklinux.com/wp-content/uploads/2018/06/configure-apache-httpd-server.jpg' },
          //{ nome: 'PostgreSQL', info: 'postgres:11-alpine',     imagem:  'https://www.quest.com/community/cfs-filesystemfile/__key/communityserver-components-secureimagefileviewer/communityserver-blogs-components-weblogfiles-00-00-00-00-39/Slide2.JPG_2D00_1100x500x2.jpg?_=637219525519183603' },
          


          //{ nome: 'hello-world', info: 'hello-world',      imagem:     'https://miro.medium.com/max/920/1*CdjOgfolLt_GNJYBzI-1QQ.jpeg' },
          //{ nome: 'busybox', info: 'busybox:uclibc',      imagem:     'https://miro.medium.com/max/920/1*CdjOgfolLt_GNJYBzI-1QQ.jpeg' },
          { nome: 'Traefik', porto: 80,info: 'traefik:latest',      imagem:     'https://churrops.files.wordpress.com/2017/11/traefik-logo2.png?w=800' },

          { nome: 'rabbitmq', porto: 5672,info: 'rabbitmq:latest',      imagem:     'https://cms-assets.tutsplus.com/uploads/users/34/posts/25597/preview_image/rabbit-mq.jpg' },
          { nome: 'wordpress', porto: 80,info: 'wordpress:latest',      imagem:     'https://pplware.sapo.pt/wp-content/uploads/2019/05/wordpress-bg-medblue-720x378.jpg' },
          //{ nome: 'python', info: 'python:latest',      imagem:     'https://miro.medium.com/max/920/1*CdjOgfolLt_GNJYBzI-1QQ.jpeg' },
          //{ nome: 'Gloang', info: 'golang:latest',      imagem:     'https://miro.medium.com/max/920/1*CdjOgfolLt_GNJYBzI-1QQ.jpeg' },
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
            .get("http://192.168.1.64:8700/api/v1/nodes",options)
            .then(response => {
            console.log("response.data.items");
            console.log(response.data.items);
            this.nodes = response.data.items;
            this.loading = false
            for (const node of this.nodes){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()
              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))
              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)
              Object.assign(node, {diascriado: this.dhm(Date.now() - Date.parse(node.metadata.creationTimestamp))});
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
        methodCriarServico(){
          
        /*const options = {
          headers:{ 'Content-Type' : 'application/yaml'}          
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
                        "targetPort": 80
                    }
                ],
                "selector": {
                    "app": this.novoServico.metadata.name,
                },
                "type": "LoadBalancer",
            }
        }
        axios.post('http://192.168.1.64:8700/api/v1/namespaces/default/services',body,options)
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
        });*/
      },

      methodCriarServico(){
          if(this.novoServico.tipodisp == "Média disponibilidade"){
            this.novoServico.tipodisp = 5
          }else if(this.novoServico.tipodisp == "Baixa disponibilidade"){
            this.novoServico.tipodisp = 2
          }else{
            this.novoServico.tipodisp = 9
          }
          console.log(this.novoServico.tipodisp)
          console.log(this.novoServico.name)
          console.log(this.servicoImagem)
          this.nomeServicoRecuperado

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
                    "name": this.novoServico.name
                },
                "spec": {
                    "replicas": parseInt(this.novoServico.tipodisp),
                    "revisionHistoryLimit": 10,
                    "selector": {
                        "matchLabels": {
                            "app": this.novoServico.name
                        }
                    },
                    "template": {
                        "metadata": {
                            "labels": {
                                "app": this.novoServico.name
                            }
                        },
                        "spec": {
                            "containers": [
                                {
                                    "name": this.novoServico.name,
                                    "image": this.servicoImagem,
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
/*************************************************************************************************************************/
            const options = {
              headers:{ 
                'Content-Type' : 'application/yaml',
                'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }        
            };
            var body=
            {
                "kind": "Service",
                "apiVersion": "v1",
                "metadata": {
                    "name": this.novoServico.name,
                },
                "spec": {
                    "ports": [
                        {
                            "port": 70,
                            "targetPort": this.portoAUsar
                        }
                    ],
                    "selector": {
                        "app": this.novoServico.name,
                    },
                    "type": "LoadBalancer",
                }
            }
            axios.post("http://192.168.1.64:8700/api/v1/namespaces/"+this.$store.state.nameSpace+"/services",body,options)
            .then(response => { 
              this.messageLogin = 'O Serviço '+this.novoServico.name+' foi criado com sucesso e está a correr no porto 70';
              this.typeMessage = 'success';
              this.snackbar= true;
              this.dialogCriarServico= false;
            })
            .catch(error => {
                console.log(error)
                this.messageLogin = error.message;
                this.typeMessage = 'error';
                this.snackbar= true;
                this.dialogCriarServico = false;
            });
 /***********************************************************************************************************************************************/
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

        criarServico (item) {
          //this.editedIndex = this.deployments.indexOf(item)
          this.servicoImagem = item.info

          this.portoAUsar = item.porto
          //console.log(item)
          this.dialogCriarServico = true
        },
        close () {
          this.dialogCriarServico = false
          this.dialogMoreInf = false
        },
      },
    }
</script>
