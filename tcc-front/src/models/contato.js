export default class Contato {
    constructor (data ={
        id: 0,
        nome: "",
        fone: "" ,
    }){
        this.id = data.id;
        this.nome = data.nome;
        this.fone = data.fone;
    }
}