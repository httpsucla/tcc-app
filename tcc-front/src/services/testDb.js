import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

export default class DatabaseManager {

  static createTables(){
    db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tbMedicamentos (' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'nome TEXT,' +
          'horario TEXT,' +
          'data_inicial DATE,' +
          'qtde INTEGER,' +
          'qtde_dias INTEGER,' +
          'ativo BOOLEAN);'
        );
        
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tb_gavetas (' +
          'id INTEGER PRIMARY KEY,' +
          'id_medicamento INTEGER,' +
          'datahora_abertura DATETIME,' +
          'is_ocupado BOOLEAN,' +
          'is_atrasado BOOLEAN,' +
          'FOREIGN KEY(id_medicamento) REFERENCES tbMedicamentos(id));'
        );
        
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS tb_contato (' +
          'id INTEGER PRIMARY KEY,' +
          'nome TEXT,' +
          'fone TEXT);'
        );
      });
  }
  static teste(){
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tbMedicamentos';",
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            console.log("A tabela existe.");
          } else {
            console.log("A tabela não existe.");
          }
        }
      );
    });
  }
  static addMedicamento(medicamento, callback) {
    console.log(medicamento)
    console.log('PORRA')
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tbMedicamentos (nome, horario, data_inicial, qtde, qtde_dias, ativo) VALUES (?, ?, ?, ?, ?, ?)',
        [medicamento.nome, medicamento.horario, medicamento.data_inicial, medicamento.qtde, medicamento.qtde_dias, 1],
        (_, { insertId, rows }) => callback({ id: insertId, ...rows._array[0] }),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  }

  static updateMedicamento(medicamento, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tbMedicamentos SET nome = ?, horario = ?, data_inicial = ?, qtde = ?, qtde_dias = ?, ativo = ? WHERE id = ?',
        [medicamento.nome, medicamento.horario, medicamento.data_inicial, medicamento.qtde, medicamento.qtde_dias, medicamento.ativo, medicamento.id],
        () => callback()
      );
    });
  }

  static deleteMedicamento(id, callback) {
    console.log(`esse é o ID ${id}:`)
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM tbMedicamentos WHERE id = ?',
        [id],
        () => callback(),
        (_, error) => console.log(`Erro ao deletar o medicamento com ID ${id}:`, error)
      );
    });
  }

  static getMedicamentos(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbMedicamentos',
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  }

  static getMedicamentoById(id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbMedicamentos WHERE id = ?',
        [id],
        () => callback()
      );
    });
  }

  static getMedicamentosByDay(day, callback) {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tbMedicamentos WHERE date(data_inicial, '+' || qtde || ' days') >= date(?, '+0 day')`,
        [day.toISOString().substring(0, 10)],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log(error)
      );
    });
  }

  static addGaveta(gaveta, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tb_gavetas (id, id_medicamento, datahora_abertura, is_ocupado, is_atrasado) VALUES (?, ?, ?, ?, ?)',
        [gaveta.id, gaveta.id_medicamento, gaveta.datahora_abertura, gaveta.is_ocupado, gaveta.is_atrasado],
        (_, { insertId, rows }) => callback({ id: insertId, ...rows._array[0] }),
      );
    });
  }

  static updateGaveta(gaveta, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tb_gavetas SET id_medicamento = ?, datahora_abertura = ?, is_ocupado = ?, is_atrasado = ? WHERE id = ?',
        [gaveta.id_medicamento, gaveta.datahora_abertura, gaveta.is_ocupado, gaveta.is_atrasado, gaveta.id],
        () => callback()
      );
    });
  }

  static deleteGaveta(id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM tb_gavetas WHERE id = ?`,
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log(`Gaveta com ID ${id} deletada com sucesso`);
            callback(true);
          } else {
            console.log(`Gaveta com ID ${id} não encontrada`);
            callback(false);
          }
        },
        error => console.log(`Erro ao deletar a gaveta com ID ${id}:`, error)
      );
    });
}

static dropTables(){
    db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE IF EXISTS tbMedicamentos;',
          [],
          (_, result) => {
            console.log('Tabela tbMedicamentos dropada com sucesso!');
          },
          (_, error) => {
            console.log('Erro ao dropar a tabela tbMedicamentos', error);
          }
        );
      });
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE IF EXISTS tb_gavetas;',
          [],
          (_, result) => {
            console.log('Tabela tbMedicamentos dropada com sucesso!');
          },
          (_, error) => {
            console.log('Erro ao dropar a tabela tbMedicamentos', error);
          }
        );
      });
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE IF EXISTS tb_contato',
          [],
          (_, result) => {
            console.log('Tabela tbMedicamentos dropada com sucesso!');
          },
          (_, error) => {
            console.log('Erro ao dropar a tabela tbMedicamentos', error);
          }
        );
      });
  }
}


