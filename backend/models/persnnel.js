const Model = require('objection').Model;

class personnel extends Model {
  static get tableName() {
    return 'Personel';
  }

  static get jsonSchema() {
    return {
      type: 'object',



     
    };
  }

  static get relationMappings() {

  }
}

module.exports = personnel;
