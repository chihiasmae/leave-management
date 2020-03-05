const config = require('../../config');
exports.up = knex => {
  /*********************************************************
   * creation de la table Historique
   *********************************************************/
  return knex.schema

    .createTable('User', table => {
      table.increments('id').primary()
      table.string('nom')
      table.integer('age')
    })

  //   /*********************************************************
  //    * creation de la table Zone
  //    *********************************************************/
  //   .createTable('Zone', table => {
  //     table.unique('num')

  //     table.increments('id').primary()
  //     table.integer('num').notNullable()
  //     table.enu('type_zone', ['string', 'int', 'double', 'boolean', 'char', 'date', 'datetime', 'json']).notNullable() // int - string - boolean - ...
  //     table.string('libelle').notNullable() // nom de la zone
  //     table.string('description')
  //   })

  //   //#region utilisateur groupeUser droits #########################################################################
  //   /*********************************************************
  //    * creation de la table Groupe_user
  //    *********************************************************/
  //   .createTable('Groupe_user', table => {
  //     table.increments('id').primary()
  //     table.integer('id_parent_groupe_user')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Groupe_user')
  //   })

  //   /*********************************************************
  //    * creation de la table Utilisateur
  //    *********************************************************/
  //   .createTable('Utilisateur', table => {
  //     table.increments('id').primary()
  //     table.string('nom')
  //     table.string('prenom')
  //     table.string('email')
  //     table.string('login')
  //     table.string('password')
  //     table.string('sel')
  //     table.integer('id_groupe_user')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Groupe_user')
  //   })
  //   //#endregion

  //   //#region  pays #################################################################################
  //   /*********************************************************
  //    * creation de la table Pays
  //    *********************************************************/
  //   .createTable('Pays', table => {
  //     table.unique('libelle')

  //     table.increments('id').primary()
  //     table.string('pays_code').notNullable()
  //     table.string('libelle').notNullable()
  //     table.string('telephone_indicatif').notNullable()
  //   })


  //   //#region Gestion des contactes #################################################################################

  //   /*********************************************************
  //    * creation de la table Personne
  //    *********************************************************/
  //   .createTable('Personne', table => {
  //     table.increments('id').primary()
  //     table.string('nom')
  //     table.string('prenom')

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')

  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()
  //   })

  //   /*********************************************************
  //    * creation de la table Organisme
  //    *********************************************************/
  //   .createTable('Organisme', table => {
  //     table.increments('id').primary()
  //     table.string('libelle')

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')

  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()
  //   })

  //   /*********************************************************
  //    * creation de la table Fonction
  //    *********************************************************/
  //   .createTable('Fonction', table => {
  //     table.increments('id').primary()
  //     table.string('libelle')
  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')
  //   })

  //   /*********************************************************
  //    * creation de la table Relation
  //    *********************************************************/
  //   .createTable('Relation', table => {
  //     table.increments('id').primary()
  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')
  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()

  //     table.integer('id_fonction')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Fonction')

  //     table.integer('id_organisme')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Organisme')

  //     table.integer('id_personne')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Personne')
  //   })
  //   /*********************************************************
  //    * creation de la table Info_personne
  //    *********************************************************/
  //   .createTable('Info_personne', table => {
  //     table.increments('id').primary()
  //     table.integer('zone_num').notNullable()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('valeur', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('valeur', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('valeur').notNullable()
  //     }
  //     table.integer('id_personne')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Personne')
  //   })

  //   /*********************************************************
  //    * creation de la table Info_organisme
  //    *********************************************************/
  //   .createTable('Info_organisme', table => {
  //     table.increments('id').primary()
  //     table.integer('zone_num').notNullable()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('valeur', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('valeur', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('valeur').notNullable()
  //     }
  //     table.integer('id_organisme')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Organisme')
  //   })

  //   /*********************************************************
  //    * creation de la table Info_relation
  //    *********************************************************/
  //   .createTable('Info_relation', table => {
  //     table.increments('id').primary()
  //     table.integer('zone_num').notNullable()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('valeur', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('valeur', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('valeur').notNullable()
  //     }
  //     table.integer('id_relation')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Relation')
  //   })

  //   //#endregion

  //   //#region Requetes et resultats #################################################################################
  //   /*********************************************************
  //    * creation de la table Theme
  //    *********************************************************/

  //   // OBE: Ajouter la contraint libelle unique pour ne pas avoir des doublons
  //   .createTable('Theme', table => {
  //     table.increments('id').primary()
  //     table.string('libelle').notNullable()
  //     table.unique('libelle')

  //   })

  //   /*********************************************************
  //    * creation de la table Requete
  //    *********************************************************/
  //   .createTable('Requete', table => {
  //     table.increments('id').primary()
  //     table.string('intitule').notNullable()

  //     if (config.clientDB == 'mssql') {
  //       table.specificType('requete_json', 'nvarchar(max)').notNullable()
  //       table.specificType('commentaires', 'nvarchar(max)')
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('requete_json', 'longtext').notNullable()
  //       table.specificType('commentaires', 'longtext')
  //     }
  //     else {
  //       table.text('requete_json').notNullable()
  //       table.text('commentaires')
  //     }

  //     table.datetime('valid_debut')
  //     table.datetime('valid_fin')

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')

  //     table.integer('id_theme')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Theme')

  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()
  //   })

  //   /*********************************************************
  //    * creation de la table Scenario
  //    *********************************************************/
  //   .createTable('Scenario', table => {
  //     table.increments('id').primary()
  //     table.string('intitule').notNullable()

  //     if (config.clientDB == 'mssql') {
  //       table.specificType('commentaires', 'nvarchar(max)')
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('commentaires', 'longtext')
  //     }
  //     else {
  //       table.text('commentaires')
  //     }

  //     table.datetime('valid_debut')
  //     table.datetime('valid_fin')

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')

  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()
  //   })

  //   /*********************************************************
  //    * creation de la table Requetes_scenario
  //    *********************************************************/
  //   .createTable('Requetes_scenario', table => {
  //     table.increments('id').primary()
  //     table.integer('id_requete')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Requete')
  //     table.integer('id_scenario')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Scenario')
  //   })
  //   //#endregion

  //   //#region Edition #################################################################################
  //   /*********************************************************
  //    * creation de la table Modele
  //    *********************************************************/
  //   .createTable('Modele', table => {
  //     table.increments('id').primary()
  //     table.string('type').notNullable()
  //     table.string('intitule').notNullable()
  //     table.string('image')
  //   })

  //   /*********************************************************
  //    * creation de la table Sous_modele
  //    *********************************************************/
  //   .createTable('Sous_modele', table => {
  //     table.increments('id').primary()
  //     table.string('intitule').notNullable()

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.datetime('date_valid_debut')
  //     table.datetime('date_valid_fin')
  //     table.timestamp('date_suppression')

  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()

  //     table.integer('id_modele')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Modele')
  //   })

  //   /*********************************************************
  //    * creation de la table Info_sous_modele
  //    *********************************************************/
  //   .createTable('Info_sous_modele', table => {
  //     table.increments('id').primary()
  //     table.integer('zone_num').notNullable()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('valeur', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('valeur', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('valeur').notNullable()
  //     }
  //     table.integer('id_sous_modele')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Sous_modele')
  //   })

  //   /*********************************************************
  //    * creation de la table Info_sous_modele_actif
  //    *********************************************************/
  //   .createTable('Info_sous_modele_actif', table => {
  //     table.increments('id').primary()
  //     table.integer('zone_num').notNullable()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('valeur', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('valeur', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('valeur').notNullable()
  //     }
  //     table.integer('id_sous_modele')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Sous_modele')
  //   })

  //   //#endregion

  //   //#region Resultat actif #################################################################################
  //   /*********************************************************
  //    * creation de la table Resultat_actif
  //    *********************************************************/
  //   .createTable('Resultat_actif', table => {
  //     table.increments('id').primary()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('resultat', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('resultat', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('resultat').notNullable()
  //     }
  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()

  //     table.unique('id_utilisateur')
  //   })
  //   // OBE: ajouter un critere pour ne pas avoir les doublants des ids utilisateur (une seule ligne par utilisateur)
  //   //#endregion

  //   //#region SMTP #################################################################################
  //   /*********************************************************
  //    * creation de la table Expediteur_smtp
  //    *********************************************************/
  //   .createTable('Expediteur_smtp', table => {
  //     table.increments('id').primary()
  //     table.string('email').notNullable()
  //     table.integer('id_utilisateur')
  //       .unsigned()
  //       .notNullable()
  //   })
  //   /*********************************************************
  //    * creation de la table Smtp
  //    *********************************************************/
  //   .createTable('Smtp', table => {
  //     table.increments('id').primary()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('contenuHtml', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('contenuHtml', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('contenuHtml').notNullable()
  //     }
  //     table.string('objet').notNullable()
  //     table.string('email_expediteur').notNullable()

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //   })
  //   /*********************************************************
  //    * creation de la table Destinataire_smtp
  //    *********************************************************/
  //   .createTable('Destinataire_smtp', table => {
  //     table.increments('id').primary()
  //     table.integer('statut_smtp')
  //     table.string('email').notNullable()

  //     table.timestamp('date_creation').notNullable().defaultTo(knex.fn.now())
  //     table.timestamp('date_envoi')

  //     table.integer('id_smtp')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Smtp')

  //     table.integer('id_relation')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Relation')
  //   })
  //   /*********************************************************
  //    * creation de la table Piece_jointe
  //    *********************************************************/
  //   .createTable('Piece_jointe', table => {
  //     table.increments('id').primary()
  //     if (config.clientDB == 'mssql') {
  //       table.specificType('data', 'nvarchar(max)').notNullable()
  //     } else if (config.clientDB == 'mysql') {
  //       table.specificType('data', 'longtext').notNullable()
  //     }
  //     else {
  //       table.text('data').notNullable()
  //     }
  //     table.string('libelle').notNullable()

  //     table.integer('id_smtp')
  //       .unsigned()
  //       .notNullable()
  //       .references('id')
  //       .inTable('Smtp')
  //   })
  //   //#endregion

  //   //#region Format page #################################################################################
  //   /*********************************************************
  //    * creation de la table Format_Page
  //    *********************************************************/
  //   .createTable('Format_Page', table => {
  //     table.increments('id').primary()
  //     table.string('libelle').notNullable()
  //     table.float('hauteur').notNullable()
  //     table.float('largeur').notNullable()
  //     table.unique('libelle')
  //   })
  // //#endregion

};

exports.down = knex => {
  /*********************************************************
   * suppression des tables du schema s'ils existent
   *********************************************************/
  return knex.schema.dropTableIfExists('Historique')
    .dropTableIfExists('User')
};
