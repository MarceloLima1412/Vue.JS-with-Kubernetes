<template>
    <v-row justify="center">
        <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
            <span>Produto alterado</span>
            <v-btn  @click="snackbar = false">Fechar</v-btn>
        </v-snackbar>

      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn fab accent v-on="on">
                <v-icon>edit</v-icon>
            </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">Editar Produto</span>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="formEditarProduto" lazy-validation>
                <v-row>
                    <v-col cols="12">
                    <v-text-field v-model="novo_produto.nome" label="Nome*" ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-select v-model="novo_produto.localizacao" :items="['sala1', 'sala2', 'cozinha']" label="Localizacao*" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-select v-model="novo_produto.tipo" :items="['objeto', 'comida']" label="Tipo" required></v-select>
                    </v-col>
                </v-row>
                <small>*campos obrigatórios</small>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1"  @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1"  @click="update()" :loading="loading">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: 'editarproduto',
        props: ['produto'],
        mounted() {
            //console.log('Component mounteasdasdd.')
            //console.log("merda")
            //console.log(this.novo_produto)
           // this.novo_produto.id=this.produto.id
            //this.novo_produto.nome=this.produto.nome
            //this.novo_produto.tipo=this.produto.tipo
            //this.novo_produto.localizacao=this.produto.localizacao
            Object.assign(this.novo_produto,this.produto)
            //console.log(this.novo_produto)
        },
        data: () => ({
            novo_produto: {
                id:'',
                nome:'',
                tipo:'',
                localizacao:'',
            }, 
            dialog: false,
            loading: false,
            snackbar: false,
        }),
        methods:{
            update(){
                if(this.$refs.formEditarProduto.validate()){
                    this.loading=true;
                    Object.assign(this.produto,this.novo_produto)
                    
                    db.collection("produtos").doc(this.produto.id)
                    .update(this.produto)
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.dialog= false;
                        this.loading=false;
                        this.snackbar= true;
                    })
                    .catch(function(error) {
                        console.error("Error updating document: ", error);
                    });
                    //this.produto=this.novo_produto;
                }
            }
        }
    }
</script>
