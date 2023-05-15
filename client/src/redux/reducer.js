import {
  GET_GAMES,
  GET_GAME_DETAILS,
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
    case GET_GAME_DETAILS:
      return { ...state, gameDetail: payload }
    case POST_GAME:
      return { ...state }

    default:
      return { ...state }
  }
}

export default reducer
