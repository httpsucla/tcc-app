import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

export default class Database {
/*
**********************************************************************************************
SUMÁRIO TABELAS: 

tb_medicamentos :
  id: id do medicamento
  nome: nome do medicamento
  horario: horario que o indivíduo deve tomar o remédio
  data_inicial: data em que o indivíduo começou a tomar o remédio - inseriu na gaveta
  qtde: quantidade de remédios cadastrados na gaveta
  qtde_dias: quantidade de dias em que o individuo tomará o remedio
  dosagem: quantos medicamentos serão tomados a cada abertura
  intervalo: de quantas em quantas horas o individuo deve tomar o remedio
  ativo: remedio deve ser exibido na lista ou nao - inativado caso o ciclo seja completo


tb_gavetas: 
  id: id da gaveta
  id_medicamento: id do medicamento cadastrado na gaveta
  datahora_abertura: data de abertura da gaveta
  is_ocupado: gaveta está ou não está ocupada
  is_atrasado: gaveta foi aberta ou não no horario programado

**********************************************************************************************
*/
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
        'dosagem INTEGER, ' + 
        'intervalo INTEGER, ' + 
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

  static addMedicamento(medicamento, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tb_medicamentos (nome, horario, data_inicial, qtde, qtde_dias, dosagem, intervalo, ativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [medicamento.nome, medicamento.horario, medicamento.data_inicial, medicamento.qtde, medicamento.qtde_dias, medicamento.dosagem, medicamento.intervalo, 1],
        (_, { insertId, rows }) => callback({ id: insertId, ...rows._array[0] }),
        (_, error) => console.log('Erro ao executar a query:', error)
      );
    });
  }

  static updateMedicamento(medicamento, callback) {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE tb_medicamentos SET nome = ?, horario = ?, data_inicial = ?, qtde = ?, qtde_dias = ?, dosagem = ?, intervalo = ?, ativo = ? WHERE id = ?',
        [medicamento.nome, medicamento.horario, medicamento.data_inicial, medicamento.qtde, medicamento.qtde_dias, medicamento.dosagem, medicamento.intervalo, medicamento.ativo, medicamento.id],
        () => callback()
      );
    });
  }

  static deleteMedicamento(id) {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tb_medicamentos SET ativo = false WHERE id = ?`,
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
        'SELECT * FROM tb_medicamentos where ativo = true',
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  }

  static getMedicamentosInativos(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tb_medicamentos where ativo = false',
        [],
        (_, { rows }) => callback(rows._array)
      );
    });
  }

  static getAllMedicamentos(callback) {
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
        (_, { rows }) => callback(rows._array)
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

  static getMedicamentoByGaveta(gavetaId, callback){
    db.transaction(tx => {
      tx.executeSql(
        `SELECT id_medicamento FROM tb_gavetas WHERE id_gaveta = ?`,
        [gavetaId],
        (_, result) => callback(result.rows._array),
        (_, error) => console.log(error)
      );
    });
  }

  static getMedicamentoFullByGaveta(gavetaId, callback){
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tb_gavetas WHERE id_gaveta = ?`,
        [gavetaId],
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

  static getGavetas2(callback) {
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

  static leftJoinGavetaMedicamento(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT tb_gavetas.*, tb_medicamentos.nome as nome, tb_medicamentos.qtde as qtde ' +
        'FROM tb_gavetas LEFT JOIN tb_medicamentos ON tb_gavetas.id_medicamento = tb_medicamentos.id',
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

  static addHistorico(hist, callback) {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tb_historico (id_gaveta, id_medicamento, dt_prevista, dt_abertura, situacao) VALUES (?, ?, ?, ?, ?)',
        [hist.id_gaveta, hist.id_medicamento, hist.dt_prevista, hist.dt_abertura, hist.situacao],
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
        `SELECT DISTINCT tb_medicamentos.nome, tb_historico.dt_prevista, tb_historico.dt_abertura
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
        `SELECT DISTINCT tb_medicamentos.nome, tb_historico.dt_prevista, tb_historico.dt_abertura
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
        `SELECT DISTINCT tb_medicamentos.nome, tb_historico.dt_prevista, tb_historico.dt_abertura
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

  static joinHistoricoMedicamento(callback) {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT tb_historico.*, tb_medicamentos.nome as nome FROM tb_historico INNER JOIN tb_medicamentos ON tb_historico.id_medicamento = tb_medicamentos.id',
        [],
        (_, { rows }) => callback(rows._array),
        (_, error) => console.log('Erro ao acessar o nome do medicamento:', error)
      );
    });
  }

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

  static getHistorico(callback) {
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


