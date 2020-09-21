<template>
    <v-row justify="center">
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>Adicionou um novo produto</span>
            <v-btn  @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>

      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn class="mb-9" block color="secondary" dark v-on="on">Inserir Produto</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Inserir Produto</span>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="formAdicionarProduto" lazy-validation>
                <v-row>
                    <v-col cols="12">
                    <v-text-field v-model="nome" label="Nome*" :rules="[v => !!v || 'Item is required']" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-select v-model="localizacao" :items="['sala1', 'sala2', 'cozinha']" label="Localizacao*" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-select v-model="tipo" :items="['objeto', 'comida']" label="Tipo" required></v-select>
                    </v-col>
                </v-row>
                <small>*campos obrigatórios</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1"  @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1"  @click="submit" :loading="loading">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: 'inserirproduto',
        props: ['produtos'],
        mounted() {
            console.log('Component.')
            db.collection('localizacao').onSnapshot(res =>{
                const changes = res.docChanges();
                changes.forEach(change =>{
                    if(change.type === 'added'){
                    this.localizacoes.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    })
                    }else if(change.type === 'removed'){
                    let list_item = change.doc;
                    if (list_item) {
                        this.$router.go({ path: this.$router.path });

                    }
                    }else if(change.type === 'modified'){
                    this.$router.go({ path: this.$router.path });
                    }
                })
                this.loading= false;
                console.log("this.localizacoes");
                console.log(this.localizacoes);
            })
        },
        data: () => ({
            produto: {
                id:'',
                nome:'',
                tipo:'',
                localizacao:'',
            }, 
            nome:'',
            tipo:'',
            localizacao:'',
            localizacoes: [],
            dialog: false,
            loading: false,
            snackbar: false,
        }),
        methods:{
            submit(){
                if(this.$refs.formAdicionarProduto.validate()){
                    this.loading=true;
                    //var newPostRef = this.produtos.push();
                    const produto = {
                        id : db.collection("produtos").doc().id,
                        nome : this.nome,
                        localizacao : this.localizacao,
                        tipo : this.tipo,
                    }

                    db.collection('produtos')
                    .add(produto)
                    .then(() =>{
                        console.log('added-------------------------------------')
                        this.loading=false;
                        //this.dialog = false;
                        this.snackbar= true;
                        this.dialog= false;
                    })
                }
            },
            created(){
                
            },
        }
    }
</script>
