const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull:false,  //false quiere decir que no se permite que este campo este vacío
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false, //es obligatorio 
    },
    birthday:{
      type: DataTypes.STRING,
      allowNull: false, 
    },
    status:{
      type: DataTypes.ENUM('Alive', 'Deceased', 'Presumed dead', 'Unknown'), //ENUM hace que me rechace cualquier cosa que no esté dentro de lo que dicen en esos paréntesis.
      allowNull: true,
    },
    img:{
      type: DataTypes.STRING,
      alloNull:true,
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
