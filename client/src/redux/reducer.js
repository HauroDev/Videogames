import {
  CLEAN_GAMES,
  CLEAN_GAME_DETAILS,
  CLEAN_GENRES,
  FILTER_GAMES,
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  POST_GAME,
  SEARCH_GAMES
} from './types-action'

const initialState = {
  allGames: [],
  games: [],
  gameDetail: {},
  genres: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
    case SEARCH_GAMES:
      return { ...state, allGames: payload, games: payload }
    case CLEAN_GAMES:
      return { ...state, allGames: [], games: [] }
    case GET_GAME_DETAILS:
      return { ...state, gameDetail: payload }
    case CLEAN_GAME_DETAILS:
      return { ...state, gameDetail: {} }
    case GET_GENRES:
      return { ...state, genres: payload }
    case CLEAN_GENRES:
      return { ...state, genres: [] }
    case POST_GAME:
      return { ...state }
    case FILTER_GAMES: {
      let filterGames = [...state.allGames]
      if (!state.allGames.length) filterGames = [...state.games]

      if (payload.source === 'DB') {
        filterGames = state.games.filter((game) => isNaN(+game.id))
      } else if (payload.source === 'API') {
        filterGames = state.games.filter((game) => typeof game.id !== 'string')
      } else if (payload.source === 'All') {
        filterGames = [...state.games]
      }

      filterGames = filterGames.filter((game) => {
        const genreIds = game.genres.map((genre) => genre.id)
        const selectedGenreIds = payload.gens.map((genre) => genre.id)
        return selectedGenreIds.every((id) => genreIds.includes(id))
      })

      if (!(payload.alpha === '⯀' && payload.rating === '⯀'))
        filterGames.sort((a, b) => {
          const order = {
            '🠕': 1,
            '🠗': -1,
            '⯀': 0
          }

          const alphaOrder = a.name.localeCompare(b.name)
          const ratingOrder = b.rating - a.rating

          // Comparación simultánea por las propiedades "alpha" y "rating"
          const compareResult =
            alphaOrder * order[payload.alpha] +
            ratingOrder * order[payload.rating]

          return compareResult
        })

      return { ...state, allGames: filterGames }
    }
    default:
      return { ...state }
  }
}

export default reducer
