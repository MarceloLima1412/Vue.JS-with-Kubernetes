<template>
    <v-container class="my-5">
        <!--<h1 class="subheading grey--text">Dashboard</h1>-->

        <v-data-table label="Slot" :items="deployments" hide-default-footer>
            <template v-slot:top>
                <v-toolbar flat>
                    <h1 class="subheading grey--text">Overview</h1>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-row class="mt-12">
                    <v-col cols="12" sm="12" md="4">
                        <pie-chart id="chartDeployments" :data="chartDeployments" :colors="['green', 'grey', 'red']"></pie-chart>
                        <v-text-field outline readonly class="centered-input text--darken-3 mt-3" value="Deployments" />
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                        <pie-chart id="chartPods" :data="chartPods" :colors="['green', 'grey', 'red']"></pie-chart>
                        <v-text-field outline readonly class="centered-input text--darken-3 mt-3" value="Pods" />
                    </v-col>
                    <v-col cols="12" sm="12" md="4">
                        <pie-chart id="chartReplicaSets" :data="chartReplicaSets" :colors="['green', 'grey', 'red']"></pie-chart>
                        <v-text-field outline readonly class="centered-input text--darken-3 mt-3" value="Replica Sets" />
                    </v-col>
                </v-row>
            </template>
            <template slot="no-data">
                <v-alert class="mt-0 mb-0 pt-0 pb-0" :value="true"></v-alert>
            </template>
        </v-data-table>

        <v-data-table :headers="headers" :items="deployments" :loading="loading" class="mt-10">
            <template v-slot:top>
                <v-toolbar flat>
                    <h1 class="subheading grey--text">Deployments</h1>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:item.props="{ item }">
                <v-chip :color="getColor(item.status.conditions[0])"></v-chip>
            </template>
        </v-data-table>

        <v-data-table :headers="headers1" :items="pods" :loading="loading1" class="mt-10">
            <template v-slot:top>
                <v-toolbar flat>
                    <h1 class="subheading grey--text">Pods</h1>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:item.props="{ item }">
                <v-chip :color="getColor1(item.status)"></v-chip>
            </template>
        </v-data-table>

        <v-data-table :headers="headers2" :items="services" :loading="loading2" class="mt-10">
            <template v-slot:top>
                <v-toolbar flat>
                    <h1 class="subheading grey--text">Services</h1>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:item.props="{ item }">
                <v-chip :color="getColor2(item.spec)"></v-chip>
            </template>
        </v-data-table>

        <v-data-table :headers="headers3" :items="replicasets" :loading="loading3" class="mt-10">
            <template v-slot:top>
                <v-toolbar flat>
                    <h1 class="subheading grey--text">Replica Sets</h1>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:item.props="{ item }">
                <v-chip :color="getColor3(item)"></v-chip>
            </template>
        </v-data-table>
    </v-container>
</template>

<style>
  .centered-input input {
  text-align: center
}
</style>
<script>
import InserirProduto from './produtos/InserirProduto'
    export default {
        components:{InserirProduto},

        name: 'pedidos',
        
        
        mounted() {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        },
        mounted() {
          this.getdeployments();
          this.gePods();
          this.getServices();
          this.getreplicasets()
        },
        methods:{
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
            //console.log("FEITO!!!!!!!!!");
            //console.log(response.data.items);
            /*this.chartDeployments['Running'] = 0
            this.chartDeployments['Paused'] = 0
            this.chartDeployments['Error'] = 0*/
            console.log(this.chartDeployments)
            this.deployments = response.data.items;
            this.loading = false
            for (const deployment of this.deployments){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()
              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))

              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)

              if(deployment.status.conditions[0].type == "Progressing") 
                this.chartDeployments['Paused'] ++ 
              else if(deployment.status.conditions[0].status == 'True'){
                this.chartDeployments['Running'] ++ 
              } else{
                this.chartDeployments['Error'] ++ 
              }
              var chart = Chartkick.charts["chartDeployments"];
              chart.updateData(this.chartDeployments)
              /*this.totalDeploymentsCin = 9
              this.totalDeploymentsVer = 9*/

              Object.assign(deployment, {diascriado: this.dhm(Date.now() - Date.parse(deployment.metadata.creationTimestamp))});
            }
            console.log(this.chartDeployments)
            })
            .catch(error => {
                console.log("Fail");
                console.log(error);
            });
          },
          getServices(){
            var options = {
              headers:{ 
                'Content-Type' : 'application/yaml',
                'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }          
            };
            axios
            .get("http://192.168.1.64:8700/api/v1/namespaces/"+this.$store.state.nameSpace+"/services",options)
            .then(response => {
            //console.log(response.data.items);
            this.services = response.data.items;
            this.loading2 = false
            for (const service of this.services){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()
              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))
              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)



              
              Object.assign(service, {diascriado: this.dhm(Date.now() - Date.parse(service.metadata.creationTimestamp))});
              /*console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
              if(service.status.loadBalancer.ingress[0] == 'null'){
                //Object.assign(service, {ipeporto: service.spec.clusterIP+':'+status.loadBalancer.ingress[0].ip});
                console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh")
              }else{

                console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
              }*/

              try{ 
                if(typeof (service.status.loadBalancer.ingress[0]) !== 'undefined')
                  Object.assign(service, {ipeporto: service.spec.clusterIP+':'/*+status.loadBalancer.ingress[0].ip*/});

                }
              catch(e) {
              }

            }
            })
            .catch(error => {
                console.log("Fail");
                console.log(error);
            });
          },
          getreplicasets(){
            var options = {
              headers:{ 
                'Content-Type' : 'application/yaml',
                'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }          
            };
            axios
            .get("http://192.168.1.64:8700/apis/apps/v1/namespaces/"+this.$store.state.nameSpace+"/replicasets",options)
            .then(response => {
            //console.log(response.data.items);
            this.replicasets = response.data.items;
            this.loading3 = false
            for (const replicaset of this.replicasets){
              //console.log(clusterrole.metadata.creationTimestamp)
              //console.log(Date.parse(clusterrole.metadata.creationTimestamp))
              //console.log()
              //console.log(typeof (Date.now()))
              //console.log(typeof(parseInt(clusterrole.metadata.creationTimestamp)))
              //console.log(Date.now()- clusterrole.metadata.creationTimestamp)

              if(replicaset.status.readyReplicas == undefined ){
                this.chartReplicaSets['Error'] ++ 
              }else{
                this.chartReplicaSets['Running'] ++
              }

              var chart= Chartkick.charts["chartReplicaSets"];
              chart.updateData(this.chartReplicaSets);

              Object.assign(replicaset, {diascriado: this.dhm(Date.now() - Date.parse(replicaset.metadata.creationTimestamp))});
            }
            })
            .catch(error => {
                console.log("Fail");
                console.log(error);
            });
          },
          gePods(){
            var options = {
              headers:{ 
                'Content-Type' : 'application/yaml',
                'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlRyc3hpR0pDeV9NVjJhOWZ3Uk9COGpvd3Q4RXh1bUF0LUduY0xfMG5xQUEifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkYXNoYm9hcmQtYWRtaW4tdG9rZW4tZnA1bGQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC5uYW1lIjoiZGFzaGJvYXJkLWFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiZjMyMjQ0NjQtODAzMy00NTM5LWIzNTgtNTQ3MDNlOTRkYzFlIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRhc2hib2FyZC1hZG1pbiJ9.vF5YBmvpQih5ycX5OibHXIhPwSg8QpvPvD5BCttOMAWEcziBZknZAp79qYjf1PkZHC4y9SdbFIWC2NXVGcueZS09F5ShV41SKwVMoL1febC-1NnLVqkvnx-nUEqh-a2rRBYNUQvGZoGe2KjiHckveWUBrmeQgGMyKhHLovfjuyLRMyaSicZdk_cxYm6jEK-CU3MTBcMlEisGvjV_LTFPnWv2pSsHWK5JCWuaLHCcrgqUXaLFd3VJlSCuREVgUvwT1RiuZlfJIZz0HLrlk1Z37lTcrJHqq-ssk25cyg9VFclBuEVwFD_QEBH8VPpHuU3zPrGeRizT3_CkebB8d7lkWQ',
              }          
            };
            axios
            .get("http://192.168.1.64:8700/api/v1/namespaces/"+this.$store.state.nameSpace+"/pods",options)
            .then(response => {
            //console.log(response.data.items);
            this.pods = response.data.items;
            this.loading1 = false
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

              if(pod.status.phase == 'Pending'){
                this.chartPods['Error'] ++ 
              }else if(pod.status.phase == "Running" && pod.status.conditions[1].status == 'False'){
                this.chartPods['Paused'] ++ 
              }else{
                this.chartPods['Running'] ++
              }
              var chart= Chartkick.charts["chartPods"];
              chart.updateData(this.chartPods);


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
            if(pros.type == "Progressing") return 'grey'
            else if (pros.status == 'True'){
              return 'green accent-4'
            } 
            else{
              return 'red';
            } 
          },
          getColor1 (pros) {
            //console.log(pros)
            if(pros.phase == 'Pending') return "red"
            if (pros.phase == "Running" && pros.conditions[1].status == 'False') return 'grey darken-1'
            else return 'green accent-4'
          },
          getColor2 (pros) {
            //console.log(pros)
            if(typeof (pros.clusterIP) !== 'undefined')
            return 'green accent-4'
            else return 'grey darken-1'
          },
          getColor3 (pros) {

            if (pros.status.readyReplicas == undefined ) return 'red'
            else return 'green accent-4'
          },
        },
        data: () => ({
          deployments: [],
          services: [],
          replicasets: [],
          loading2: true,
          loading: true,
          loading1: true,
          loading3: true,

          chartDeployments: {
            'Running': 0,
            'Paused': 0,
            'Error': 0,
          },

          chartPods: {
            'Running': 0,
            'Paused': 0,
            'Error': 0,
          },

          chartReplicaSets: {
            'Running': 0,
            'Paused': 0,
            'Error': 0,
          },
          pods:[],
          headers: [
            {text: '', value: 'props'},
            {text: 'Nome', value: 'metadata.name'},
            {text: 'Namespace', value: 'metadata.namespace'},
            {text: 'Labels', value: 'spec.template.metadata.labels.app'},
            {text: 'Pods', value: 'status.replicas'},
            {text: 'Created', value: 'diascriado' },
            {text: 'Images', value: 'spec.template.spec.containers[0].name' },
          ],
          headers1: [
          {text: '', value: 'props'},
          { text: 'Nome', value: 'metadata.name' },
          { text: 'Namespace', value: 'metadata.namespace' },
          { text: 'Ip', value: 'status.podIPs[0].ip' },
          {text: 'Labels', value: 'metadata.labels.app'},
          { text: 'Node', value: 'spec.nodeName' },
          { text: 'Status', value: 'status2' },
          { text: 'Restarts', value: 'status.containerStatuses[0].restartCount' },
          {text: 'Created', value: 'diascriado' },
          
        ],
        headers2: [
          {text: '', value: 'props' },
          {text: 'Nome', value: 'metadata.name' },
          {text: 'Namespace', value: 'metadata.namespace' },
          {text: 'Labels', value: 'metadata.labels.component'},
          {text: 'Internal Endpoints', value: 'spec.ports[0].nodePort'},
          {text: 'Cluster IP', value: 'spec.clusterIP' },
          {text: 'External Endpoints', value: 'ipeporto'},
          { text: 'Created', value: 'diascriado' },

        ],
        headers3: [
          {text: '', value: 'props'},
          {text: 'Nome', value: 'metadata.name'},
          {text: 'Namespace', value: 'metadata.namespace'},
          {text: 'Labels', value: 'spec.template.metadata.labels.app'},
          {text: 'Pods', value: 'status.replicas'},
          {text: 'Created', value: 'diascriado' },
          {text: 'Images', value: 'spec.template.spec.containers[0].name' },
        ],
      })
    }
</script>