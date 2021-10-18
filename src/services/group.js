import { db } from '../config/connectionDB';

const table = "GRUPO";

export const addData = (name) => {
  return new Promise((resolve, reject) => db.transaction(
    tx => {
      tx.executeSql(`INSERT INTO ${table} (NOME) 
              values (?)`,
        [name],
        (_, { insertId, rows }) => {
          resolve(insertId)
        }), (sqlError) => {
          console.log(sqlError);
        }
    }, (txError) => {
      console.log(txError);
    }));
}

export const findAll = () => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(`SELECT * FROM ${table}`, [], (_, { rows }) => {
      resolve(rows)
    }), (sqlError) => {
      console.log(sqlError);
    }
  }, (txError) => {
    console.log(txError);
  }))
}

export const deleteOne = (id) => {
  return new Promise((resolve, reject) => db.transaction(
    tx => {
      tx.executeSql(`DELETE FROM ${table} WHERE ID = (?);`,
        [id],
        (_, { insertId, rows }) => {
          resolve(insertId)
        }), (sqlError) => {
          console.log(sqlError);
        }
    }, (txError) => {
      console.log(txError);
    }));
}

export const updateOne = (id, newName) => {
  return new Promise((resolve, reject) => db.transaction(
    tx => {
      tx.executeSql(`UPDATE ${table} SET NOME = (?) WHERE ID = (?);`,
        [newName, id],
        (_, { insertId, rows }) => {
          resolve(insertId)
        }), (sqlError) => {
          console.log(sqlError);
        }
    }, (txError) => {
      console.log(txError);
    }));
}