export default class Gaveta {
    constructor (data ={
        id: 0,
        id_medicamento: 0,
        datahora_abertura: "",
        is_ocupado: false,
        is_atrasado: false,
    }){
        this.id = data.id;
        this.id_medicamento = data.id_medicamento;
        this.datahora_abertura = data.datahora_abertura;
        this.is_ocupado = data.is_ocupado;
        this.is_atrasado = data.is_atrasado;
    }
}