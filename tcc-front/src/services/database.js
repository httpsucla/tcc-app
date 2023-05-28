import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

export default class Database {

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
        'ativo BOOLEAN);',
        [],
        () => console.log('Tabela Medicamento com sucesso'),
        (_, error) => console.log('Erro ao criar tabela Medicamento:', error)
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tb_gavetas (' +
        'id INTEGER PRIMARY KEY,' +
        'id_medicamento INTEGER,' +
        'datahora_abertura DATETIME,' +
        'is_ocupado BOOLEAN,' +
        'is_atrasado BOOLEAN,' +
        'FOREIGN KEY(id_medicamento) REFERENCES tb_medicamentos(id));',
        [],
        () => console.log('Tabela Gaveta com sucesso'),
        (_, error) => console.log('Erro ao criar tabela Gaveta:', error)
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tb_contatos (' +
        'id INTEGER PRIMARY KEY,' +
        'nome TEXT,' +
        'telefone TEXT);',
        [],
        () => console.log('Tabela Contato com sucesso'),
        (_, error) => console.log('Erro ao criar tabela Contato:', error)
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tb_historico (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_gaveta INTEGER, 
          id_medicamento INTEGER,
          dt_prevista DATE,
          dt_abertura DATE,
          situacao BOOLEAN,
          FOREIGN KEY (id_gaveta) REFERENCES tb_gavetas(id),
          FOREIGN KEY (id_medicamento) REFERENCES tb_medicamentos(id)
        );`,
        [],
        () => console.log('Tabela Historico com sucesso'),
        (_, error) => console.log('Erro ao criar tabela Historico:', error)
      );
    });
  }

  // static teste() {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='tb_historico';",
  //       [],
  //       (_, { rows }) => {
  //         if (rows.length > 0) {
  //           console.log("A tabela existe.");
  //         } else {
  //           console.log("A tabela não existe.");
  //         }
  //       }
  //     );
  //   });
  // }


  static teste() {
    // db.transaction(tx => {
    //   tx.executeSql(`drop table tb_medicamentos;`,
    //   [],
    //   () => console.log('Tabela dropada'),
    //   (_, error) => console.log('Erro ao criar tabela Historico:', error)
    //   );
    // });

    // db.transaction(tx => {
    //   tx.executeSql(`drop table tb_historico;`,
    //   [],
    //   () => console.log('Tabela dropada'),
    //   (_, error) => console.log('Erro ao criar tabela Historico:', error)
    //   );
    // });

    // db.transaction(tx => {
    //   tx.executeSql(`INSERT INTO tb_medicamentos (nome, horario, data_inicial, qtde, qtde_dias, ativo) 
    //   VALUES ('Dramin', '08:00', '2022-01-01', 10, 10, 1),
    //   ('Rilalina', '12:00', '2022-01-01', 10, 10, 1),
    //   ('Dipirona', '05:00', '2022-01-01', 10, 10, 1),
    //   ('Calmante', '13:00', '2022-01-01', 10, 10, 1)
    //   `,
    //   [],
    //   () => console.log('Tabela Historico com sucesso'),
    //   (_, error) => console.log('Erro ao criar tabela Historico:', error)
    //   );
    // });

    // db.transaction(tx => {
    //   tx.executeSql(`INSERT INTO tb_historico (id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao) 
    //   VALUES (1, 1, '2023-05-01 10:00', '2023-05-01 10:02', 1),
    //   (1, 1, '2023-05-02 10:00', '2023-05-02 10:45', 1),
    //   (1, 1, '2023-05-03 10:00', '', 0),
    //   (1, 1, '2023-05-04 10:00', '2023-05-04 10:10', 1),
    //   (2, 2, '2023-05-09 19:00', '2023-05-09 19:00', 1),
    //   (2, 2, '2023-05-10 19:00', '2023-05-10 19:30', 1),
    //   (2, 2, '2023-05-11 19:00', '2023-05-11 19:08', 1),
    //   (3, 3, '2023-05-01 00:00', '2023-05-01 00:02', 1),
    //   (3, 3, '2023-05-02 00:00', '2023-05-02 00:11', 1),
    //   (3, 3, '2023-05-03 00:00', '', 0),
    //   (4, 4, '2023-04-01 14:00', '2023-04-01 14:08', 1),
    //   (4, 4, '2023-04-02 14:00', '2023-04-02 14:58', 1),
    //   (4, 4, '2023-04-03 14:00', '2023-04-03 14:14', 1)
    //   `,
    //   [],
    //   () => console.log('Insert com sucesso'),
    //   (_, error) => console.log('Erro ao criar tabela A2:', error)
    //   );
    // });
  }


  static addMedicamento(medicamento, callback) {
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
        'SELECT tb_gavetas.*, tb_medicamentos.nome as nome, tb_medicamentos.qtde as qtde ' +
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
        `REPLACE INTO tb_contatos (id, nome, telefone) VALUES (?, ?, ?);`,
        [1, contato.nome, contato.telefone],
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

  static addHistorico() {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tb_historico (id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao) VALUES (?, ?, ?, ?, ?)',
        [id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao],
        (_, { insertId, rows }) => callback({ id: insertId, ...rows._array[0] }),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  };

  static updateHistorico() {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE tb_historico SET id_gaveta = ?, id_medicamento = ?, dt_prevista = ?, dt_abertura = ?, situacao = ? WHERE id = ?',
        [id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao, id],
        (_, { rowsAffected }) => callback(rowsAffected),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  };

  static getHistoricoRelatorio(callback) {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome, tb_historico.dt_prevista, tb_historico.dt_abertura
        FROM tb_historico
        INNER JOIN tb_medicamentos ON tb_historico.id_medicamento = tb_medicamentos.id
        WHERE tb_historico.dt_prevista > DateTime('Now', 'LocalTime', '-30 Day')
        ORDER BY tb_historico.dt_prevista DESC;`,
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  };

  static getHistoricoByMed(medicamento, callback) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome, tb_historico.dt_prevista, tb_historico.dt_abertura
        FROM tb_historico
        INNER JOIN tb_medicamentos ON tb_historico.id_medicamento = tb_medicamentos.id
        WHERE tb_historico.id_medicamento = ?
        AND tb_historico.dt_prevista > DateTime('Now', 'LocalTime', '-30 Day')
        ORDER BY tb_historico.dt_prevista DESC;`,
        [medicamento],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao acessar:', error)
      ); 
    });
  };

  static getHistoricoByDate(medicamento, dt_inicio, dt_fim, callback) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome, tb_historico.dt_prevista, tb_historico.dt_abertura
        FROM tb_historico
        INNER JOIN tb_medicamentos ON tb_historico.id_medicamento = tb_medicamentos.id
        WHERE tb_historico.id_medicamento = ?
        AND tb_historico.dt_prevista BETWEEN ? AND ?
        ORDER BY tb_historico.dt_prevista DESC`,
        [medicamento,dt_inicio, dt_fim],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao acessar:', error)
      ); 
    });
  };


  static getMedicamentoHistorico(medicamento) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome
        FROM tb_historico
        INNER JOIN tb_medicamentos ON tb_historico.id_medicamento = tb_medicamentos.id
        WHERE tb_medicamentos.id = ?`,
        [medicamento],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao acessar o nome do medicamento:', error)
      );
    });
  };

  static getDataInicioHistorico(data) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT dt_prevista FROM tb_historico WHERE dt_prevista >= ?`,
        [data],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao buscar a frequência:', error)
      );
    });
  };

  static getDataFimHistorico(data) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT dt_prevista FROM tb_historico WHERE dt_prevista <= ?`,
        [data],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao buscar a frequência:', error)
      );
    });
  };

  static getInicioFimHistorico(dataI, dataF) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT dt_prevista FROM tb_historico WHERE dt_prevista BETWEEN ? AND ?`,
        [dataI, dataF],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao buscar a frequência:', error)
      );
    });
  };

  static getMedicamentoDataInicioHistorico(medicamento, data) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome, tb_historico.dt_prevista
        FROM tb_historico
        INNER JOIN tb_gavetas ON tb_historico.id_gaveta = tb_gavetas.id
        INNER JOIN tb_medicamentos ON tb_gavetas.id_medicamento = tb_medicamentos.id
        WHERE tb_medicamentos.id = ? AND tb_historico.dt_prevista >= ?`,
        [medicamento, data],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao buscar o medicamento e a frequência:', error)
      );
    });
  };

  static getMedicamentoDataFimHistorico(medicamento, data) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome, tb_historico.dt_prevista
        FROM tb_historico
        INNER JOIN tb_gavetas ON tb_historico.id_gaveta = tb_gavetas.id
        INNER JOIN tb_medicamentos ON tb_gavetas.id_medicamento = tb_medicamentos.id
        WHERE tb_medicamentos.id = ? AND tb_historico.dt_prevista <= ?`,
        [medicamento, data],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao buscar o medicamento e a frequência:', error)
      );
    });
  };

  static getMedicamentoInicioFimHistorico(medicamento, dataI, dataF) {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT tb_medicamentos.nome, tb_historico.dt_prevista
        FROM tb_historico
        INNER JOIN tb_gavetas ON tb_historico.id_gaveta = tb_gavetas.id
        INNER JOIN tb_medicamentos ON tb_gavetas.id_medicamento = tb_medicamentos.id
        WHERE tb_medicamentos.id = ? AND tb_historico.dt_prevista BETWEEN ? and ?`,
        [medicamento, dataI, dataF],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log('Erro ao buscar o medicamento e a frequência:', error)
      );
    });
  };

  static removeHistorico() {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tb_historico WHERE id = ?',
        [id],
        (_, { rowsAffected }) => callback(rowsAffected),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  };

  static getHistorico() {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tb_historico',
        [],
        (_, { rows }) => callback(rows._array),
        (_, error) => console.log('Erro ao executar a query:', error)
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
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE IF EXISTS tb_historico',
        [],
        (_, result) => {
          console.log('Tabela tb_historico dropada com sucesso!');
        },
        (_, error) => {
          console.log('Erro ao dropar a tabela tb_historico', error);
        }
      );
    });
  }


}


