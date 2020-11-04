const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //Esto permite ayudar a manejar el error de clave unico. Ya que mongoose no lo maneja de buena forma. Este complementa detalles del error en la respuesta
const eRolesValid = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es valido', //El {VALUE} inyecta el value que fue pasado y que esta diciendo que no es valido
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    unique: true,
    type: String,
    required: [true, 'El email es obligatorio'],
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio'],
  },
  avatar: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: eRolesValid,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isSignedByGoogle: {
    type: Boolean,
    default: false,
  },
});
UserSchema.methods.toJSON = function () {
  //Se "sobre escribe" la funcion toJSON para este caso debido a que esta es la ultima que ejecuta antes de retornar el "resultado". Por lo tanto, al querer modificar algo que no se desea retornar se puede hacer aca
  const { password, __v, ...userWithoutPassword } = this.toObject(); //This, es el objeto que "instancio" con los datos pasados por el body de la peticion. Pero como se quiere eliminar el password para que no sea retornado se usa la destructuracion
  //ref: https://ultimatecourses.com/blog/remove-object-properties-destructuring
  return userWithoutPassword;
};
UserSchema.plugin(uniqueValidator, {
  message: '{PATH} debe ser un valor unico',
}); // Se hace con el {PATH} porque ya mongoose esta preparado para inyectarle ello. SIN TEMPLATE STRING
module.exports = mongoose.model('user', UserSchema);
