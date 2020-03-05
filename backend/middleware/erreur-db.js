/**
 * @author MBE
 * gérer tous les erreurs de la base de données
 */
const { ValidationError, NotFoundError } = require('objection');
const {
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError
} = require('objection-db-errors');

const sendErrorHttp = (err, res) => {
  console.error("complete erreur sendErrorHttp:", err);
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        res.status(400).send({
          message: err.message,
          type: 'ModelValidation',
          data: err.data
        });
        break;
      case 'RelationExpression':
        res.status(400).send({
          message: err.message,
          type: 'InvalidRelationExpression',
          data: {}
        });
        break;
      case 'UnallowedRelation':
        res.status(400).send({
          message: err.message,
          type: 'UnallowedRelation',
          data: {}
        });
        break;
      case 'InvalidGraph':
        res.status(400).send({
          message: err.message,
          type: 'InvalidGraph',
          data: {}
        });
        break;
      default:
        res.status(400).send({
          message: err.message,
          type: 'UnknownValidationError',
          data: {}
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      type: 'NotFound',
      data: {}
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table,
      }
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      type: 'InvalidData',
      data: {}
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {}
    });
  } else {
    res.status(500).send({
      message: err.message,
      type: 'UnknownError',
      data: {}
    });
  }
};

const getError = (err) => {
  //console.error("complete erreur getError:", err);
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        return {
          message: err.message,
          type: 'ModelValidation',
          data: err.data
        };
      case 'RelationExpression':
        return {
          message: err.message,
          type: 'InvalidRelationExpression',
          data: {}
        };
      case 'UnallowedRelation':
        return {
          message: err.message,
          type: 'UnallowedRelation',
          data: {}
        };
      case 'InvalidGraph':
        return {
          message: err.message,
          type: 'InvalidGraph',
          data: {}
        };
      default:
        return {
          message: err.message,
          type: 'UnknownValidationError',
          data: {}
        };
    }
  } else if (err instanceof NotFoundError) {
    return {
      message: err.message,
      type: 'NotFound',
      data: {}
    };
  } else if (err instanceof UniqueViolationError) {
    return {
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint
      }
    };
  } else if (err instanceof NotNullViolationError) {
    return {
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table,
      }
    };
  } else if (err instanceof ForeignKeyViolationError) {
    return {
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    };
  } else if (err instanceof CheckViolationError) {
    return {
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint
      }
    };
  } else if (err instanceof DataError) {
    return {
      message: err.message,
      type: 'InvalidData',
      data: {}
    };
  } else if (err instanceof DBError) {
    return {
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {}
    };
  } else {
    return {
      message: err.message,
      type: 'UnknownError',
      data: {}
    };
  }
};

module.exports = { sendErrorHttp, getError };
