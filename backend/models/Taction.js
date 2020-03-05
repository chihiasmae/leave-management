const Model = require('objection').Model;
const cra = require('../models/cra');


class Taction extends Model {
  static get tableName() {
    return 'TypeAction';
  }

  static get idColumn() {
    return 'idA';
  }

  static get jsonSchema() {
    return {
      type: 'object',
     

      properties: {
        idA: { type: 'integer' },

        action: { type: 'string' },



       
      }
    };
  }

  static get relationMappings() {
    return {
      list_cra: {
        relation: Model.HasManyRelation,
        modelClass: require('./cra'),

        join: {
          from: 'TypeAction.idA',
          to: 'CRA.idA'
        }
      }
    };
  }
}


module.exports = Taction;
