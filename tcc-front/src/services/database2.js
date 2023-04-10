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

        this.dropHistorico = `DROP TABLE tb_historico;`;    
        this.sqlHistorico = `CREATE TABLE IF NOT EXISTS tb_historico( 
                id integer PRIMARY KEY, 
                id_gaveta integer,
                id_medicamento TEXT,
                dthora_abertura TEXT,
                dthora_prevista TEXT,
                situacao TEXT);`;
            
        const res1 = this.executar(this.sqlMedicamento, []);
        const res2 = this.executar(this.sqlGaveta, []);

        const res31 = this.executar(this.dropHistorico, []);
        const res3 = this.executar(this.sqlHistorico, []);
        for(var i=1; i < 5; i++){
            console.log("INSERINDO GAVETA" + i);
            const res4 = this.executar(
                `INSERT OR IGNORE INTO tb_gavetas(id, id_medicamento, datahora_abertura, is_ocupado, is_atrasado) 
                VALUES (`+i+`, 0, '', 0, 0)`,[]);
        }
       // const res2 = this.executar("DELETE FROM tb_gavetas WHERE id IN (1,2,3,4) ", []);
       //const res2 = this.executar("DROP table tb_gavetas ", []);
       const res5 = this.executar(`INSERT OR IGNORE INTO tb_historico  
       (id, id_gaveta, id_medicamento, dthora_abertura, dthora_prevista, situacao)
       VALUES (16, 3, 'Dramin', '20/10 00:10', '20/10 00:00', 'Ok'),
       (15, 3, 'Ritalina', '20/10 08:05', '20/10 08:00', 'Ok'),
       (10, 3, 'Dipirona', '21/10 15:04', '21/10 15:00', 'Ok'),
       (11, 3, 'Ritalina', '21/10 12:15', '20/10 12:00', 'Ok'),
       (12, 3, 'Dipirona', '20/10 22:00', '20/10 20:00', 'Atraso'),
       (13, 3, 'Dramin', '20/10 19:31', '20/10 19:30', 'Ok'),
       (14, 3, 'Dramin', '20/10 14:33', '20/10 14:30', 'Ok'),
       (17, 3, 'Dramin', '20/10 19:31', '20/10 19:30', 'Ok'),
       (18, 3, 'Dramin', '20/10 19:31', '20/10 19:30', 'Ok'),
       (19, 3, 'Dramin', '20/10 19:31', '20/10 19:30', 'Ok'),
       (20, 3, 'Dramin', '20/10 19:31', '20/10 19:30', 'Ok'),
       (21, 3, 'Dramin', '20/10 19:31', '20/10 19:30', 'Ok');`, []);

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
