export default class Gaveta {
    constructor (data ={
        id: 0,
        id_medicamentos: 0,
        datahora_abertura: "",
        is_ocupado: false,
        is_atrasado: false,
    }){
        this.id = data.id;
        this.id_medicamentos = data.id_medicamentos;
        this.datahora_abertura = data.datahora_abertura;
        this.is_ocupado = data.is_ocupado;
        this.is_atrasado = data.is_atrasado;
    }
}