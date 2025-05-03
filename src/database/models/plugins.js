// src/database/models/plugins.js

/**
 * Plugin que remove campos privados e transforma o _id em id
 * @param {mongoose.Schema} schema
 */
const toJSON = function(schema) {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      // Remove campos privados
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          delete ret[path];
        }
      });

      // Transforma _id em id
      ret.id = ret._id.toString();
      delete ret._id;
      
      // Remove campos padrão do Mongoose
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      // Aplica transformação personalizada se existir
      if (transform) {
        return transform(doc, ret, options);
      }
    }
  });
};

module.exports = toJSON;