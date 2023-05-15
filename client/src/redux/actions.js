import axios from 'axios'
import {
  CLEAN_GAMES,
  CLEAN_GAME_DETAILS,
  GET_GAMES,
  GET_GAME_DETAILS,
  POST_GAME,
  SEARCH_GAMES
} from './types-action'

const url_server = 'http://localhost:3001'

export const getGames = () => {
  const endpoint = url_server + '/videogames'
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint)
      return dispatch({
        type: GET_GAMES,
        payload: data.results
      })
    } catch (error) {
      return dispatch({
        type: GET_GAMES,
        payload: error
      })
    }
  }
}

export const cleanGames = () => {
  return {
    type: CLEAN_GAMES
  }
}

export const getGameDetails = (id) => {
  const endpointWithId = url_server + `/videogames/${id}`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpointWithId)
      return dispatch({
        type: GET_GAME_DETAILS,
        payload: data
      })
    } catch (error) {
      return dispatch({
        type: GET_GAME_DETAILS,
        payload: error
      })
    }
  }
}

export const cleanGameDetails = () => {
  return {
    type: CLEAN_GAME_DETAILS
  }
}

export const postGame = (game) => {
  const endpoint = url_server + '/videogames'
  return async (dispatch) => {
    await axios.post(endpoint, game)
    return dispatch({
      type: POST_GAME
    })
  }
}

export const getSearch = (name) => {
  const endpoint_search = url_server + `/videogames?name=${name}`

  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint_search)
    return dispatch({
      type: SEARCH_GAMES,
      payload: data.results
    })
    } catch (error) {
      return dispatch({
        type: SEARCH_GAMES,
        payload: error
      })
    }
  }
}

export const getGenres = () => {
  const endpoint_genres = url_server + '/genres'

  return async (dispatch) => {
    const { data } = await axios.get(endpoint_genres)
    return dispatch({
      type: SEARCH_GAMES,
      payload: data.genres
    })
  }
}
