const Model = require('objection').Model;

class Cra extends Model {
  static get tableName() {
    return 'CRA';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      

      properties: {
       
        id: { type: 'integer' },
        position: { type: 'integer' },
        date: { type: 'Date'},
        action: { type: 'string'},
        projet: { type: 'string' },
        fiche: { type: 'string'},
        commentaire: { type: 'string' },
        charge: { type: 'float'},
        salarie: { type: 'string' },
        dateString: { type: 'string' },
      




       
       
      }
    };
  }

  static get relationMappings() {
   
  }
}

module.exports = Cra;
