module.exports = ({
  id,
  name,
  description,
  platforms,
  background_image,
  image,
  released,
  rating,
  genres
}) => ({
  id,
  name,
  description,
  platforms:
    typeof platforms[0] === 'object'
      ? platforms?.map(({ platform: { name } }) => name)
      : platforms,
  image: image || background_image,
  released,
  rating,
  genres: genres?.map(({ id, name }) => ({ id, name }))
})
