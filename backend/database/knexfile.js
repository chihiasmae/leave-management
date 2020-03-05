//creer un fichier de migration de la base de données ==>  knex migrate:make migration_name
//executer la dernier mise a jour ==> knex migrate:latest --env production

//creer un fichier de seed (insersion de données) ==> knex seed:make seed_name
//remplir les données dans la base ==> knex seed:run --env production

const config = require('../config');
const connectionDB = {
  host: config.hostDB,
  port: config.portDB,
  encrypt: config.encryptDB,
  user: config.userDB,
  password: config.passwordDB,
  database: config.databaseDB,
  timezone: 'UTC',
  requestTimeout: 3600000,
};

const dbConfig = {
  client: config.clientDB,
  version: config.versionDB,
  connection: connectionDB,
  migrations: {
    directory: __dirname + '/migrations'
  },
  seeds: {
    directory: __dirname + '/' + config.seed_folder
  },
  pool: {
    min: 2,
    max: 100
  }
};
const sqliteConf = {
  client: 'sqlite3',
  connection: {
    filename: __dirname + '/dev.sqlite3'
  },
  useNullAsDefault: true
};

const configDev = config.clientDB === 'sqlite' ? sqliteConf : dbConfig;

module.exports = {

  development: configDev,

  staging: {
    client: config.clientDB,
    version: config.versionDB,
    connection: connectionDB,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/' + config.seed_folder
    },
    pool: {
      min: 2,
      max: 100
    }
  },

  production: {
    client: config.clientDB,
    version: config.versionDB,
    connection: connectionDB,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/' + config.seed_folder
    },
    pool: {
      min: 2,
      max: 100
    }
  }

};
