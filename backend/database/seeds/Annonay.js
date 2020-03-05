const knexDb = require('knex');
const { Model } = require('objection');
const knexConfig = require('../knexfile');

const chalk = require('chalk');
const writLog = chalk.yellow;
const succesLog = chalk.bold.green;

const jsonTableNom = require('../../_dbjson/table_nom.json');
const jsonTableCode = require('../../_dbjson/table_code.json');
const jsonZone = require('../../_dbjson/zone.json');

const JSON_ANNONAY = require('../../_dbjson/clients/ANNONAY.json');

const database = knexDb(knexConfig.development);
Model.knex(database);

const Table_nom = require('../../models/Table_nom');
const Table_code = require('../../models/Table_code');
const Zone = require('../../models/Zone');
const Relation = require('../../models/Relation');

const Organisme = require('../../models/Organisme');
const Personne = require('../../models/Personne');
const Fonction = require('../../models/Fonction');
const Info_organisme = require('../../models/Info_organisme');
const Info_personne = require('../../models/Info_personne');
const Info_relation = require('../../models/Info_relation');

const Adresse = require('../../models/Adresse');
const Commune = require('../../models/Commune');

const { multipleInsert } = require('../../util');

const tableCodetoAdd = [
  {
    "valeur": "Service",
    "code": "SE",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 18
  },
  {
    "valeur": "Industrie",
    "code": "IN",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 18
  },
  {
    "valeur": "Commerce",
    "code": "CO",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 18
  },
  {
    "valeur": "Autre",
    "code": "AU",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 18
  },
  {
    "valeur": "ARTISAN-COMMERCANT",
    "code": "ART-COM",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "AUTRE PERSONNE MORALE DE DROIT PRIVE",
    "code": "APMD",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "AUTRE SA A CONSEIL D'ADMINIS- TRATION",
    "code": "SA",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "AUTRE SA A DIRECTOIRE",
    "code": "SAD",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "AUTRE SOCIETE A RESPONSABILITE LIMITEE",
    "code": "SARL",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "BANQUE POPULAIRE",
    "code": "BQUE POP",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "CAISSE DE CREDIT AGRICOLE MUTUEL",
    "code": "CCAM",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "CAISSE -FEDERALE- DE CREDIT MUTUEL",
    "code": "CFCM",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "COMMERCANT",
    "code": "COMM",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "ETAB. PUBLIC LOCAL A CARACTERE INDUSTRIEL OU COMMERCIAL",
    "code": "EPIC",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "ETAB. PUBLIC NATION. IND OU CO DOTE D'UN COMPTABLE PUBLIC",
    "code": "EPICN",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "GROUPEMENT D'INTERET ECONOMIQUE",
    "code": "GIE",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "MICROENTREPRENEUR",
    "code": "ME",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "MICROENTREPRENEUR RM",
    "code": "ME-RM",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "PROFESSION LIBERALE",
    "code": "PL",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SA COOPERATIVE DE PRODUCTION DE HLM A DIRECTOIRE",
    "code": "SACPD",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SARL COOPERATIVE OUVRIERE DE PRODUCTION",
    "code": "SARP",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SARL UNIPERSONNELLE",
    "code": "EURL",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SOC. DE FAIT PERS. PHYSIQUES",
    "code": "SDF",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SOCIETE ANONYME (SA) A CONSEIL D ADMINISTRATION",
    "code": "SASC",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SOCIETE EN NOM COLLECTIF",
    "code": "SNC",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SOCIETE PAR ACTION A ASSOCIE UNIQUE",
    "code": "SASU",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SOCIETE PAR ACTIONS SIMPLIFIEE",
    "code": "SAS",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  },
  {
    "valeur": "SOCIETE PAR ACTIONS SIMPLIFIEE (SAS)",
    "code": "SAS2",
    "date_valid_debut": null,
    "date_valid_fin": null,
    "id_table_nom": 25
  }
];

// convertir date nombre de excel vers date js
excelDateToJSDate = date => {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

exports.seed = async (knex, Promise) => {
  //#region redifinition des table Table_code et Table_nom
  await database.schema
    .dropTableIfExists('Table_code')
    .dropTableIfExists('Table_nom')

    .createTable('Table_nom', table => {
      table.increments('id').primary()
      table.integer('zone_num')
      table.string('libelle').notNullable()
    })
    /*********************************************************
     *  MBK :: creation de la table Table_code
     *********************************************************/
    .createTable('Table_code', table => {
      table.increments('id').primary()
      table.string('valeur').notNullable()
      table.string('code').notNullable()
      // table.unique('code') // on a annuler cette propriete car, car il existe des valeurs dupliquer du code lors de la migration.
      table.datetime('date_valid_debut')
      table.datetime('date_valid_fin')
      // MBK :: ajout de la clé secondaire unique
      table.integer('id_table_nom').notNullable()
        .unsigned()
        .references('id')
        .inTable('Table_nom')
    });

  try {
    const countTable_nom = await Table_nom.query().resultSize();
    if (countTable_nom > 0) {
      process.stdout.write(writLog(`\rLa table Table_nom est déja remplie!                    \t\t\r\n`));
    } else {
      const sizeListTableNom = jsonTableNom.length;
      for (let i = 0; i < sizeListTableNom; i++) {
        await Table_nom.query().insertGraph(jsonTableNom[i]);
        process.stdout.write(writLog(`\rInsertion dans la table Table_nom: ${(((i + 1) / sizeListTableNom) * 100).toFixed(2)}% ==> ${i + 1}/${sizeListTableNom}\r`));
      }
      process.stdout.write(succesLog(`\rInsertion dans la table Table_nom ... 100%                     \t\t\r\n`));
    }

    jsonTableCode.map(jtc => {
      const newItem = jtc;
      newItem.date_valid_debut = new Date(jtc.date_valid_debut);
      newItem.date_valid_fin = new Date(jtc.date_valid_fin);
      return newItem;
    });

    const countTable_code = await Table_code.query().resultSize();
    if (countTable_code > 0) {
      process.stdout.write(writLog(`\rLa table Table_code est déja remplie!                      \t\t\r\n`));
    } else {
      const sizeListTableCode = jsonTableCode.length;
      for (let i = 0; i < sizeListTableCode; i++) {
        await Table_code.query().insertGraph(jsonTableCode[i]);
        process.stdout.write(writLog(`\rInsertion dans la table Table_code: ${(((i + 1) / sizeListTableCode) * 100).toFixed(2)}% ==> ${i + 1}/${sizeListTableCode}\r`));
      }
      for (let i = 0; i < tableCodetoAdd.length; i++) {
        await Table_code.query().insertGraph(tableCodetoAdd[i]);
      }
      process.stdout.write(succesLog(`\rInsertion dans la table Table_code ... 100%                                \t\t\r\n`));
    }
    //#endregion

    //#region redifinition de la table zone
    //ZONES
    await database.schema.dropTableIfExists('Zone');
    await database.schema.createTable('Zone', table => {
      table.increments('id').primary()
      table.integer('num').notNullable()
      table.unique('num')
      table.string('type_zone') // int - string - boolean - ...
      table.string('libelle').notNullable() // nom de la zone predefinie
      table.string('libelle_short').notNullable() // nom de la zone utiliser pour l'affichage dans l'app
      table.string('description')
      table.boolean('requetable').notNullable()
    });

    for (let zone of jsonZone) {
      if (zone.num == 3921) {
        zone.libelle_short = 'N° Siret';
      } else if (zone.num == 3922) {
        zone.libelle_short = 'Enseigne';
      } else if (zone.num == 3923) {
        zone.libelle_short = 'Activité';
      } else if (zone.num == 3513) {
        zone.libelle_short = 'Effectif établissement';
      } else if (zone.num == 3924) {
        zone.libelle_short = 'CP Ville Bureau ditributeur';
      } else if (zone.num == 3407) {
        zone.libelle_short = 'Ville Bureau ditributeur';
      } else if (zone.num == 3925) {
        zone.libelle_short = 'Activité principale établissement';
      } else if (zone.num == 3403) {
        zone.libelle_short = 'Structure Juridique';
      } else if (zone.num == 3406) {
        zone.libelle_short = 'Tranche d\'effectif';
      }
    }

    await Zone.query().insertGraph(jsonZone);
    process.stdout.write(succesLog(`\rinsertion des données dans la table Zone ... 100%           \t\t\r\n`));
    //#endregion

    //#region insertion des contacts annonay
    const listCommuneIntrouvable = [];
    const sizeRelation = JSON_ANNONAY.length - 1;
    for (let i = 1; i < JSON_ANNONAY.length; i++) {
      const item = JSON_ANNONAY[i];
      let dateDebutActivite = null;
      if (item[25] && item[25].length > 0) {
        dateDebutActivite = Number.parseInt(item[25]);
      }

      // insertion du personne s'il n'existe pas
      if (!await Personne.query().findOne({ nom: item[5], prenom: item[4] })) {
        await Personne.query().insertGraph({
          prenom: item[4],
          nom: item[5],
          list_info_personne: [
            {
              zone_num: 1003, //Titre
              valeur: item[3]
            }
          ],
          id_utilisateur: 1
        });
      }

      // insertion du fonction s'il n'existe pas
      if (!await Fonction.query().findOne({ libelle: item[22] })) {
        await Fonction.query().insert({ libelle: item[22] });
      }

      // insertion du organisme s'il n'existe pas
      const testOrg = await Organisme.query().findOne({ libelle: item[1].length > 0 ? item[1] : item[0] });
      let idOrganisme = testOrg ? testOrg.id : 0;
      if (!testOrg) {
        idOrganisme = await Organisme.query().insert({
          libelle: item[1].length > 0 ? item[1] : item[0],
          id_utilisateur: 1
        }).returning('id').pluck('id');
      }
      else {
        const infoAddr = await Info_organisme.query().findOne({ zone_num: 3103, id_organisme: testOrg.id });
        if (infoAddr) {
          const testAddr = Adresse.query().findById(infoAddr.valeur);
          if (!(testAddr.libelle == (item[6].length > 0 ? item[6] : '-')
            && testAddr.adresse == (item[7].length > 0 ? item[7] : '-') && testAddr.cmpAdresse1 == item[8])) {
            idOrganisme = await Organisme.query().insert({
              libelle: item[1].length > 0 ? item[1] : item[0],
              id_utilisateur: 1
            }).returning('id').pluck('id');
          }
        } else {
          idOrganisme = await Organisme.query().insert({
            libelle: item[1].length > 0 ? item[1] : item[0],
            id_utilisateur: 1
          }).returning('id').pluck('id');
        }
      }

      const relation = {
        id_fonction: (await Fonction.query().findOne({ libelle: item[22] })).id,
        id_organisme: idOrganisme,
        id_personne: (await Personne.query().findOne({ nom: item[5], prenom: item[4] })).id,
        id_utilisateur: 1
      };

      const listInfoOrganisme = [];
      if (dateDebutActivite != null) {
        listInfoOrganisme.push({
          zone_num: 3005, //Date début activité
          valeur: excelDateToJSDate(dateDebutActivite).toISOString(),
          id_organisme: idOrganisme
        });
      }
      if (item[0] && item[0].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3921, //Siret
          valeur: item[0],
          id_organisme: idOrganisme
        });
      }
      if (item[2] && item[2].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3922, //Enseigne
          valeur: item[2],
          id_organisme: idOrganisme
        });
      }

      // ajouter adresse et commune
      if ((item[6] && item[6].length > 0) || (item[7] && item[7].length > 0)) {
        const adresseOrg = await Adresse.query().findOne({ libelle: item[6].length > 0 ? item[6] : '-', adresse: item[7].length > 0 ? item[7] : '-' });
        if (adresseOrg) {
          if (!await Info_organisme.query().findOne({ zone_num: 3103, valeur: '' + adresseOrg.id })) {
            listInfoOrganisme.push({
              zone_num: 3103, //Adresse 1
              valeur: '' + adresseOrg.id,
              id_organisme: idOrganisme
            });
          }
        } else {
          let commune;
          if (item[21] == 'SAINT JACQUES D ATTICIEUX') {//SAINT JACQUES D ATTICIEUX
            commune = await Commune.query().findOne({ libelle: "SAINT-JACQUES-D'ATTICIEUX" });
          }

          if (!commune) {
            commune = await Commune.query().findOne({ libelle: item[21] });
          }

          if (!commune) {
            commune = await Commune.query().findOne({ libelle: item[21].replace(/ /g, '-') });
          }

          if (commune) {
            const idAdresse = await Adresse.query().insert({
              libelle: item[6].length > 0 ? item[6] : '-',
              adresse: item[7].length > 0 ? item[7] : '-',
              cmpAdresse1: item[8],
              diffusion: '1',
              nieme: 1,
              id_commune: commune.id
            }).returning('id').pluck('id');

            listInfoOrganisme.push({
              zone_num: 3103, //Adresse 1
              valeur: '' + idAdresse,
              id_organisme: idOrganisme
            });
          } else {
            listCommuneIntrouvable.push(item[21]);
          }
        }
      }

      if (item[9] && item[9].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3102, //Code Postal
          valeur: item[9],
          id_organisme: idOrganisme
        });
      }
      if (item[10] && item[10].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3101, //Ville
          valeur: item[10],
          id_organisme: idOrganisme
        });
      }
      if (item[11] && item[11].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3301, //Libellé catégorie
          valeur: item[11],
          id_organisme: idOrganisme
        });
      }
      if (item[12] && item[12].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3003, //Code APE
          valeur: item[12],
          id_organisme: idOrganisme
        });
      }
      if (item[14] && item[14].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3403, //Libellé forme juridique
          valeur: item[14],
          id_organisme: idOrganisme
        });
      }
      if (item[16] && item[16].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3923, //Activité établissement (courte)
          valeur: item[16],
          id_organisme: idOrganisme
        });
      }
      if (item[19] && item[19].length > 0) {
        if (!await Info_organisme.query().findOne({ zone_num: 3201, id_organisme: idOrganisme })) {
          listInfoOrganisme.push({
            zone_num: 3201, //Téléphone
            valeur: item[19],
            id_organisme: idOrganisme,
            Info_supplementaire: {
              nieme: 1,
              prive: 1
            }
          });
        } else {
          const teleOrg = await Info_organisme.query().findOne({ zone_num: 3201, valeur: item[19], id_organisme: idOrganisme });
          if (!teleOrg) {
            listInfoOrganisme.push({
              zone_num: 3201, //Téléphone
              valeur: item[19],
              id_organisme: idOrganisme,
              Info_supplementaire: {
                nieme: 2,
                prive: 1
              }
            });
          }
        }
      }
      if (item[20] && item[20].length > 0) {
        if (!await Info_organisme.query().findOne({ zone_num: 3201, id_organisme: idOrganisme })) {
          listInfoOrganisme.push({
            zone_num: 3202, //Fax
            valeur: item[20],
            id_organisme: idOrganisme,
            Info_supplementaire: {
              nieme: 1,
              prive: 1
            }
          });
        } else {
          const teleOrg = await Info_organisme.query().findOne({ zone_num: 3201, valeur: item[19], id_organisme: idOrganisme });
          if (!teleOrg) {
            listInfoOrganisme.push({
              zone_num: 3202, //Fax
              valeur: item[20],
              id_organisme: idOrganisme,
              Info_supplementaire: {
                nieme: 2,
                prive: 1
              }
            });
          }
        }
      }
      if (item[26] && item[26].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3513, //Effectif établissement
          valeur: item[26],
          id_organisme: idOrganisme
        });
      }
      if (item[27] && item[27].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3406, //Libellé tranche d'effectif
          valeur: item[27],
          id_organisme: idOrganisme
        });
      }
      if (item[28] && item[28].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3301, //Catégorie
          valeur: item[28],
          id_organisme: idOrganisme
        });
      }
      if (item[29] && item[29].length > 0) {
        if (!await Info_organisme.query().findOne({ zone_num: 3201, id_organisme: idOrganisme })) {
          listInfoOrganisme.push({
            zone_num: 3205, //WEB
            valeur: item[29],
            id_organisme: idOrganisme,
            Info_supplementaire: {
              nieme: 1,
              prive: 1
            }
          });
        } else {
          const teleOrg = await Info_organisme.query().findOne({ zone_num: 3201, valeur: item[19], id_organisme: idOrganisme });
          if (!teleOrg) {
            listInfoOrganisme.push({
              zone_num: 3205, //WEB
              valeur: item[29],
              id_organisme: idOrganisme,
              Info_supplementaire: {
                nieme: 2,
                prive: 1
              }
            });
          }
        }
      }
      if (item[31] && item[31].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3924, //Code postal
          valeur: item[31],
          id_organisme: idOrganisme
        });
      }
      if (item[32] && item[32].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3407, //Bureau distributeur
          valeur: item[32],
          id_organisme: idOrganisme
        });
      }
      if (item[33] && item[33].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3204, //Email
          valeur: item[33],
          id_organisme: idOrganisme
        });
      }
      if (item[34] && item[34].length > 0) {
        listInfoOrganisme.push({
          zone_num: 3925, //Activité principale établissement
          valeur: item[34],
          id_organisme: idOrganisme
        });
      }

      await Info_organisme.query().insertGraph(listInfoOrganisme);
      await Relation.query().insertGraph(relation);
      process.stdout.write(writLog(`\rInsertion des données de ANNONAY ... ${(((i + 1) / sizeRelation) * 100).toFixed(2)}% ==> ${i + 1}/${sizeRelation}\r`));
    }

    process.stdout.write(succesLog(`\rInsertion des données de ANNONAY ... 100%                                              \t\t\r\n`));

    console.log('Communes Introuvable: ', listCommuneIntrouvable);

    console.log('Verification des contacts ...');
    const listIdAdd1003 = await Personne.query()
      .whereNotIn('id', Info_personne.query().select('id_personne').where('zone_num', 1003))
      .select('id').map(resutl => [1003, "''", resutl.id]);

    const listIdAdd2002 = await Relation.query()
      .whereNotIn('id', Info_relation.query().select('id_relation').where('zone_num', 2002))
      .select('id').map(resutl => [2002, "''", resutl.id]);

    const listIdAdd3009 = await Organisme.query()
      .whereNotIn('id', Info_organisme.query().select('id_organisme').where('zone_num', 3009))
      .select('id').map(resutl => [3009, "''", resutl.id]);

    console.log('insert 1003 ...')
    await multipleInsert('Info_personne', Info_personne, ['zone_num', 'valeur', 'id_personne'], listIdAdd1003);

    console.log('insert 3009 ...')
    await multipleInsert('Info_organisme', Info_organisme, ['zone_num', 'valeur', 'id_organisme'], listIdAdd3009);

    console.log('insert 2002 ...')
    await multipleInsert('Info_relation', Info_relation, ['zone_num', 'valeur', 'id_relation'], listIdAdd2002);
    //#endregion
  } catch (err) {
    console.error('\nerr Gestion des tables:', err);
  }
};
