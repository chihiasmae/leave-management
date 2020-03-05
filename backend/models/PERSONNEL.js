const Model = require('objection').Model;

class personnel extends Model {
  static get tableName() {
    return 'PERSONNEL';
  }

  static get jsonSchema() {
    return {
      type: 'object',
     

    
        properties: {
          id: { type: 'integer' },
          datedeb: { type: 'Date'},
          datefin: { type: 'Date'},
          nbrJours: { type: 'integer' },
          dated: { type: 'Date'},
          etat :{type:'string'},
          TypeConge: { type: 'string'},
          demandeur:{type:'string'},
          motif:{type:'string'},

      }
    };
  }

  static get relationMappings() {
    
  }
}

module.exports = personnel;
