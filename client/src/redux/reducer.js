import {
  CLEAN_GAMES,
  CLEAN_GAME_DETAILS,
  CLEAN_GENRES,
  GET_GAMES,
  GET_GAME_DETAILS,
  GET_GENRES,
  POST_GAME,
  SEARCH_GAMES
} from './types-action'

const initialState = {
  allGames: [],
  gameDetail: {},
  genres: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
    case SEARCH_GAMES:
      return {
        ...state,
        allGames: payload
      }
    case CLEAN_GAMES:
      return { ...state, allGames: [] }
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

    default:
      return { ...state }
  }
}

export default reducer
