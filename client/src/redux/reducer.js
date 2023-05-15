import { GET_GAMES } from './types-action'

const initialState = {
  allGames: [],
  gameDetail: {},
  genres: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: payload
      }

    default:
      return { ...state }
  }
}

export default reducer
