import Gaveta from '../models/gaveta'
import LDatabase from './ldatabase'

export default class Database{
    constructor(){
        this.table_name = 'tb_gavetas'
        this.db = new LDatabase('tcc2.db', (db) => {
            db.executeQuery(`CREATE TABLE IF NOT EXISTS ${this.table_name}( id integer PRIMARY KEY AUTOINCREMENT, id_medicamentos integer, horario TEXT, datahora_abertura TEXT, is_ocupado boolean, is_atrasado boolean, 
                             FOREIGN KEY(id_medicamentos) REFERENCES tb_medicamentos(id));`, () => {}, (error) => {console.log(error)})
        console.log("Banco de dados iniciado")
        })
    }
    
    getGavetaById(gavetaId){
        return new Promise(resolve => {
            var query = `SELECT tb_gavetas.*, tb_medicamentos.nome FROM tb_gavetas inner join tb_medicamentos on tb_medicamentos.id = tb_gavetas.id and tb_gavetas.id = ${gavetaId} `;
            console.log(query)
            this.db.executeQuery(query, (_, res) => {
                console.log(res.rows._array);
                resolve(res.rows._array)
            }, (e)=>console.log(e))
        })
    } 

    deleteGavetaById(id){
        return new Promise(resolve => {
            if(id != null && id != 0){
                const query = `DELETE FROM ${this.table_name2} WHERE id = ${id};`
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
            
        })
    }

    insertNewGaveta(gaveta=new Gaveta()){
        return new Promise(resolve => {
            console.log(gaveta);
            if(gaveta){
                const query = `INSERT INTO tb_gaveta(id_medicamento, datahora_abertura, is_ocupado, is_atrasado) VALUES (${gaveta.id_medicamentos}, '${gaveta.datahora_abertura}', ${gaveta.is_ocupado}, ${gaveta.is_atrasado});`
                console.log(query)
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
        })
    }
    
    editMedicineById(medicamento=new Medicamento()){
        return new Promise(resolve => {
            console.log(medicamento);
            if(medicamento){
                const query = `
                    UPDATE ${this.table_name} 
                    SET nome='${medicamento.nome}',
                        horario='${medicamento.horario}',
                        data_inicial='${medicamento.data_inicial}',
                        qtde=${medicamento.qtde},
                        qtde_dias=${medicamento.qtde_dias},
                        ativo=${medicamento.ativo}
                    WHERE id=${medicamento.id} ;`
                console.log(query)
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
        })
    }

}
