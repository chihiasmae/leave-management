const Model = require('objection').Model;
const cra = require('../models/cra');

class projet extends Model {
  static get tableName() {
    return 'Projet';
  }

  static get idColumn() {
    return 'idP';
  }

  static get jsonSchema() {
    return {
      type: 'object',
     

      properties: {
        idP: { type: 'integer' },


        titre: { type: 'string' },



      
      }
    };
  }

  static get relationMappings() {
    return {
      list_cra: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/cra',

        join: {
          from: 'Projet.idP',
          to: 'CRA.idP'
        }
      }
    }

  }
}
module.exports = projet;