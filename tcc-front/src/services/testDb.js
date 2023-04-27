import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

export default class DatabaseManager {

  static createTables() {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tb_medicamentos (' +
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
        'FOREIGN KEY(id_medicamento) REFERENCES tb_medicamentos(id));'
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tb_contatos (' +
        'id INTEGER PRIMARY KEY,' +
        'nome TEXT,' +
        'telefone TEXT);'
      );
    });
  }
  static teste() {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tb_medicamentos';",
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
        'INSERT INTO tb_medicamentos (nome, horario, data_inicial, qtde, qtde_dias, ativo) VALUES (?, ?, ?, ?, ?, ?)',
        [medicamento.nome, medicamento.horario, medicamento.data_inicial, medicamento.qtde, medicamento.qtde_dias, 1],
        (_, { insertId, rows }) => callback({ id: insertId, ...rows._array[0] }),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  }

  static updateMedicamento(medicamento, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tb_medicamentos SET nome = ?, horario = ?, data_inicial = ?, qtde = ?, qtde_dias = ?, ativo = ? WHERE id = ?',
        [medicamento.nome, medicamento.horario, medicamento.data_inicial, medicamento.qtde, medicamento.qtde_dias, medicamento.ativo, medicamento.id],
        () => callback()
      );
    });
  }

  static deleteMedicamento(id) {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tb_medicamentos WHERE id = ?`,
        [id],
        (_, result) => {
          console.log('Item excluído com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao excluir o item:', error);
        },
      );
    });
  };

  static getMedicamentos(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tb_medicamentos',
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  }

  static getMedicamentoById(id, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tb_medicamentos WHERE id = ?',
        [id],
        () => callback()
      );
    });
  }

  static getMedicamentosByDay(day, callback) {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tb_medicamentos WHERE date(data_inicial, '+' || qtde || ' days') >= date(?, '+0 day')`,
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

  static addGavetaTeste() {
    db.transaction(tx => {
      for (let i = 0; i < 4; i++) {
        tx.executeSql(
          'INSERT INTO tb_gavetas (id, id_medicamento, datahora_abertura, is_ocupado, is_atrasado) VALUES (?, ?, ?, ?, ?)',
          [i, '', '', '', ''],
          (_, error) => console.log('Erro ao executar a query:', error),
        );
      }

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

  static getGavetas(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tb_gavetas',
        [],
        (_, { rows }) => callback(rows._array)
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

  static joinGavetaMedicamento(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT tb_gavetas.*, tb_medicamentos.* tb_medicamentos.nome as nome_medicamento, tb_medicamentos.qtde as qtde_medicamento ' +
        'FROM tb_gavetas JOIN tb_medicamentos ON tb_gavetas.id_medicamento = tb_medicamentos.id',
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  }

  static addContato(contato, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tb_contatos (nome, telefone) VALUES (?, ?)',
        [contato.nome, contato.telefone],
        (_, { insertId, rows }) => callback({ id: insertId, ...rows._array[0] }),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  }

  static addContatoTeste(contato) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO tb_contatos (id, nome, telefone) VALUES (?, ?, ?)`,
        [1, contato.nome, contato.telefone],
        (_, error) => console.log('Erro ao executar a query:', error),
      );
    });
  }

  static getContatos(callback) {
    console.log("entrou no getContatos");
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tb_contatos',
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  }

  static updateContato(contato, callback) {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE tb_contatos SET nome = ?, telefone = ? WHERE id = ?`,
        [contato.nome, contato.telefone, contato.id],
        () => callback()
      );
    });
  }

  static deleteContato() {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tb_contatos`,   
        (_, result) => {
          console.log('Contato excluído com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao excluir contato:', error);
        },
      );
    });
  };

  static dropTables() {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS tb_medicamentos;',
        [],
        (_, result) => {
          console.log('Tabela tb_medicamentos dropada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao dropar a tabela tb_medicamentos', error);
        }
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS tb_gavetas;',
        [],
        (_, result) => {
          console.log('Tabela tb_gavetas dropada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao dropar a tabela tb_gavetas', error);
        }
      );
    });
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS tb_contatos',
        [],
        (_, result) => {
          console.log('Tabela tb_contatos dropada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao dropar a tabela tb_contatos', error);
        }
      );
    });
  }
}


