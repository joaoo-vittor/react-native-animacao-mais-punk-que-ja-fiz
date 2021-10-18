import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('test.db');

const sql = [
  `CREATE TABLE IF NOT EXISTS GRUPO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(100) NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS SISTEMA (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    LETRA CHAR(1),
    DIA_DA_SEMANA VARCHAR(10)
  );`,
  `CREATE TABLE IF NOT EXISTS EXERCICIO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(100) NOT NULL,
    SERIE INTEGER NOT NULL,
    REPETICAO INTEGER NOT NULL,
    CARGA FLOAT(10,2),
    TEMPO_DESCANCO INTEGER,
    GRUPO_ID INT NOT NULL,
    SISTEMA_ID INT NOT NULL,
    FOREIGN KEY(GRUPO_ID) REFERENCES GRUPO(ID),
    FOREIGN KEY(SISTEMA_ID) REFERENCES SISTEMA(ID)
  );`
];

db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
  console.log('Foreign keys turned on')
);

db.transaction(
  tx => {
    for (var i = 0; i < sql.length; i++) {
      tx.executeSql(sql[i]);
    }
  }, (error) => {
    console.log(error);
  }
);

export { db }
