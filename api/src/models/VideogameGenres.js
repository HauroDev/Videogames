const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Videogame = sequelize.models.videogame
  const Genre = sequelize.models.genre
  sequelize.define(
    'videogameGenre',
    {
      videogameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Videogame,
          key: 'id'
        }
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Genre,
          key: 'id'
        }
      }
    },
    {
      timestamps: false
    }
  )
}
