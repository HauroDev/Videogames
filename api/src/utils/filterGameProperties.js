module.exports = ({
  id,
  name,
  description,
  platforms,
  background_image: image,
  released,
  rating,
  genres
}) => ({
  id,
  name,
  description,
  platforms: platforms.map(({ platform: { id, name } }) => ({ id, name })),
  image,
  released,
  rating,
  genres: genres.map(({ id, name }) => ({ id, name }))
})
