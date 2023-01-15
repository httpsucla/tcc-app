const SQLite = require('expo-sqlite')

export default class Database{
    constructor(){
        this.db = SQLite.openDatabase('SMART_CABINET.db');
        this.sqlMedicamento = `CREATE TABLE IF NOT EXISTS tb_medicamentos(
            id integer PRIMARY KEY AUTOINCREMENT,
            nome text,s
            horario TEXT,
            data_inicial TEXT,
            qtde integer,
            qtde_dias integer,
            ativo boolean);`;

        this.sqlGaveta = `CREATE TABLE IF NOT EXISTS tb_gavetas( 
            id integer PRIMARY KEY,
            id_medicamento integer,
            datahora_abertura TEXT,
            is_ocupado boolean,
            is_atrasado boolean);`;
        
            
        const res1 = this.executar(this.sqlMedicamento, []);
        const res2 = this.executar(this.sqlGaveta, []);
        for(var i=1; i < 5; i++){
            console.log("INSERINDO GAVETA" + i);
            const res3 = this.executar(
                `INSERT OR IGNORE INTO tb_gavetas(id, id_medicamento, datahora_abertura, is_ocupado, is_atrasado) 
                VALUES (`+i+`, 0, '', 0, 0)`,[]);
        }
       // const res2 = this.executar("DELETE FROM tb_gavetas WHERE id IN (1,2,3,4) ", []);
       //const res2 = this.executar("DROP table tb_gavetas ", []);
    }

    //insert, delete, update
    executar(sql, params = []){
        return new Promise((resolve, reject) => {
            console.log("executar: " + sql)
            this.db.transaction((tx) => {
                tx.executeSql(sql, params, 
                    (tx, result) => {resolve(result)},
                    (error) => {
                        reject(error);
                        console.log("Error " + error)}
                );
            });
        });
    }

    //select
    executarSelect(sql, params = []){
        return new Promise((resolve, reject) => {
            console.log("executarSelect: " + sql)
            this.db.transaction((tx) => {
                tx.executeSql(sql, params, 
                    (tx, result) => {
                        console.log(result.rows._array)
                        resolve(result.rows._array)},
                    (error) => {reject(error)}
                );
            });
        });
    }

}
