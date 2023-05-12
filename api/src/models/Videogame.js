const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'videogame',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1024),
        allowNull: false
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      released: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
}