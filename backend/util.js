const config = require('./config');

const knex = require('knex');
const knexConfig = require('./database/knexfile');

const database = knex(knexConfig.development);
const { Model } = require('objection');
Model.knex(database);

module.exports = {
  suipiLike: (colonne, valeur) => {
    valeur = valeur.replace(/[']+/g, "''");
    switch (config.clientDB) {
      case 'mssql':
        return `${colonne} like '${valeur}' COLLATE Latin1_General_CI_AI`;
      case 'mysql':
        colonne = colonne.replace(/[\[\]]+/g, "`");
        return `UPPER(${colonne}) like UPPER('${valeur}')`;
      case 'oracledb':
        return `NLSSORT(${colonne}, 'NLS_SORT = Latin_CI') like NLSSORT('${valeur}', 'NLS_SORT = Latin_CI')`;
      default:
        return `UPPER(${colonne}) like UPPER('${valeur}')`;
    }
  },
  suipiNotLike: (colonne, valeur) => {
    valeur = valeur.replace(/[']+/, "''");
    switch (config.clientDB) {
      case 'mssql':
        return `${colonne} not like '${valeur}' COLLATE Latin1_General_CI_AI`;
      case 'mysql':
        colonne = colonne.replace(/[\[\]]+/g, "`");
        return `UPPER(${colonne}) not like UPPER('${valeur}')`;
      case 'oracledb':
        return `NLSSORT(${colonne}, 'NLS_SORT = Latin_CI') not like NLSSORT('${valeur}', 'NLS_SORT = Latin_CI')`;
      default:
        return `UPPER(${colonne}) not like UPPER('${valeur}')`;
    }
  },
  suipiConcat: (v1, v2, v3) => {
    switch (config.clientDB) {
      case 'mssql':
        return ` ISNULL(${v1},'') +''+ ISNULL(${v2},'') +''+ ISNULL (${v3},'')`;
      case 'oracledb':
        return `CONCAT (NVL(${v1}, ''),NVL(${v2}, ''),NVL(${v3}, ''))`;
      case 'pg':
        return `CONCAT (NULLIF(${v1}, ''),NULLIF(${v2}, ''),NULLIF(${v3}, ''))`;
      case 'mysql':
        return `CONCAT (IFNULL(${v1}, ''),IFNULL(${v2}, ''),IFNULL(${v3}, ''))`;
      default:
        return `${v1}||${v2}||${v3}`;
    }
  },
  multipleInsert: async (nomTable, ObjTable, columns, rows) => {
    switch (config.clientDB) {
      case 'mssql':
      case 'mysql':
        for (let i = 0; i < rows.length; i += 1000) {
          await database.raw(`INSERT INTO ${nomTable} (${columns.join(',')}) VALUES (${rows.slice(i, 1000 + i).join('),(')})`);
        }
        break;
      case 'oracledb':
        let queryInsert = 'INSERT ALL ';
        for (let i = 0; i < rows.length; i++) {
          queryInsert += `INTO ${nomTable} (${columns.join(',')}) VALUES (${rows.join(',')}) `
        }
        queryInsert += ' SELECT 1 FROM DUAL ';
        await database.raw(queryInsert);
        break;
      case 'pg':
        await ObjTable.query().insert(rows);
        break;

      default:
        await ObjTable.query().insertGraph(rows);
        break;
    }
  }
}
