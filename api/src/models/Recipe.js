const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    summary:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    score:{
      type: DataTypes.FLOAT,
      allowNull:false,
    },
    healthScore:{
      type: DataTypes.FLOAT,
    },
    image:{
      type:DataTypes.STRING
    },
    steps:{
      type: DataTypes.TEXT,
    },
  });
};
// APY-KEY:'525ff39f760f43fe9aeb48dcfbf9122a'