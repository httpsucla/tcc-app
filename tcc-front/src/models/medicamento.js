export default class Medicamento {
    constructor (data ={
        id: 0,
        nome: "",
        horario: "" ,
        data_inicial: "",
        qtde: 0,
        qtde_dias: 0,
        ativo: false
    }){
        this.id = data.id;
        this.nome = data.nome;
        this.horario = data.horario;
        this.data_inicial = data.data_inicial;
        this.qtde = data.qtde;
        this.qtde_dias = data.qtde_dias;
        this.ativo = data.ativo;
    }
}