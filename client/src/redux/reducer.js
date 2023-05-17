import {
  CLEAN_GAMES,
  CLEAN_GAME_DETAILS,
  CLEAN_GENRES,
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  SORT_GAMES,
  POST_GAME,
  SEARCH_GAMES,
  SOURCE_GAMES
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
    case SORT_GAMES: {
      const sortedGames =
        payload === '⯀'
          ? [...state.games]
          : [...state.games].sort((a, b) => {
              if (payload === '🠕') return a.name.localeCompare(b.name)
              if (payload === '🠗') return b.name.localeCompare(a.name)
            })
      return { ...state, allGames: sortedGames }
    }
    case SOURCE_GAMES: {
      const filterGames =
        payload === 'All'
          ? [...state.games]
          : state.games.filter((game) => {
              if (payload === 'DB') return isNaN(+game.id)
              if (payload === 'API') return typeof game.id === 'number'
            })
      return { ...state, allGames: filterGames }
    }
    default:
      return { ...state }
  }
}

export default reducer
