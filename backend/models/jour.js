const Model = require('objection').Model;

class jour extends Model {
  static get tableName() {
    return 'JOURFERIE';
  }

  static get jsonSchema() {
    return {
      type: 'object',
     

      properties: {
      
      }
    };
  }

  static get relationMappings() {
  
  }
}

module.exports = jour;
