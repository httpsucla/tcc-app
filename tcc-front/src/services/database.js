import Medicamento from '../models/medicamento'
import Gaveta from '../models/gaveta'
import LDatabase from './ldatabase'
import Contato from '../models/contato';

export default class Database{
    constructor(){
        this.table_name = 'tb_medicamentos'
        this.table_name2 = 'tb_gavetas'
        this.table_name3 = 'tb_contato'
        this.db = new LDatabase('tcc2.db', (db) => {
        //    db.executeQuery(`CREATE TABLE IF NOT EXISTS ${this.table_name}( id integer PRIMARY KEY AUTOINCREMENT, nome text, horario TEXT, data_inicial TEXT, qtde integer, qtde_dias integer, ativo boolean);`, () => {}, (error) => {console.log(error)});
        //    db.executeQuery(`CREATE TABLE IF NOT EXISTS ${this.table_name2}( id integer PRIMARY KEY AUTOINCREMENT, id_medicamentos integer, horario TEXT, datahora_abertura TEXT, is_ocupado boolean, is_atrasado boolean,
        //                     FOREIGN KEY(id_medicamentos) REFERENCES tb_medicamentos(id));`, () => {}, (error) => {console.log(error)});
            db.executeQuery(`CREATE TABLE IF NOT EXISTS ${this.table_name3}( id integer PRIMARY KEY, nome text, fone TEXT);`, () => {}, (error) => {console.log(error)});

         /*   for (var i = 1; i <= 4; i++){
                console.log('entrou aq')
                let gaveta = new Gaveta();
                gaveta.id = i;
                gaveta.id_medicamentos = 0;
                gaveta.datahora_abertura = "";
                gaveta.is_ocupado = false;
                gaveta.is_atrasado = false;
                console.log(gaveta);
                this.insertNewGaveta(gaveta);
            }*/
        console.log("Banco de dados iniciado")
        })
    }
    getAllMedicine(){
        return new Promise(resolve => {
            console.log('teste')
            var query = `SELECT * FROM ${this.table_name}`;
            console.log(query)
            this.db.executeQuery(query, (_, res) => {
                console.log(res.rows._array);
                resolve(res.rows._array)
            }, (e)=>console.log(e))
        })
    } 
    
    getAllMedicineById(id){
        return new Promise(resolve => {
            this.db.executeQuery(`SELECT * FROM ${this.table_name} WHERE id = ${id}`, (_, res) => {
                resolve(res.rows._array)
            }, (e)=>console.log(e))
        })
    }

    insertNewMedicine(medicamento=new Medicamento()){
        return new Promise(resolve => {
            console.log(medicamento);
            if(medicamento){
                const query = `INSERT INTO ${this.table_name} (nome, horario, data_inicial, qtde, qtde_dias, ativo) VALUES ('${medicamento.nome}', '${medicamento.horario}', '${medicamento.data_inicial}', ${medicamento.qtde}, ${medicamento.qtde_dias}, ${medicamento.ativo});`
                console.log(query)
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
        })
    }

    deleteMedicineById(id){
        return new Promise(resolve => {
            if(id != null && id != 0){
                console.log('entrou')
                const query = `DELETE FROM ${this.table_name} WHERE id = ${id};`
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
            
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
                const query = `INSERT INTO tb_gaveta(id_medicamentos, datahora_abertura, is_ocupado, is_atrasado) VALUES (${gaveta.id_medicamentos}, '${gaveta.datahora_abertura}', ${gaveta.is_ocupado}, ${gaveta.is_atrasado});`
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

    // usar pra insert ou update
    insertNewContato(contato=new Contato()){
        return new Promise(resolve => {
            console.log(contato);
            if(contato){
                const query = `INSERT OR REPLACE INTO tb_contato(id, nome, fone) VALUES (1, '${contato.nome}', '${contato.fone}');`
                console.log(query)
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            }else resolve(false)
        })
    }

    deleteContato(){
        return new Promise(resolve => {
                const query = `DELETE FROM ${this.table_name3} WHERE id = 1`
                this.db.executeQuery(query, ()=>resolve(true), (_)=>{console.log(_); resolve(false)})
            })
    }
    getContato(){
        return new Promise(resolve => {
            var query = `SELECT * FROM tb_contato`;
            console.log(query)
            this.db.executeQuery(query, (_, res) => {
                console.log(res.rows._array);
                if (res.rows._array.length == 0)
                    resolve('')
                else
                    resolve(res.rows._array)
            }, (e)=>console.log('e ' + e))
        })
    }

}
