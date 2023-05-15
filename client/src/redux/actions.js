import axios from 'axios'
import {
  GET_GAMES,
  GET_GAME_DETAILS,
  POST_GAME,
  SEARCH_GAMES
} from './types-action'

const url_server = 'http://localhost:3001'

export const getGames = () => {
  const endpoint = url_server + '/videogames'
  return async (dispatch) => {
    const { data } = await axios.get(endpoint)
    return dispatch({
      type: GET_GAMES,
      payload: data.results
    })
  }
}

export const getGameDetails = (id) => {
  const endpointWithId = url_server + `/videogames/${id}`

  return async (dispatch) => {
    const { data } = await axios.get(endpointWithId)
    return dispatch({
      type: GET_GAME_DETAILS,
      payload: data
    })
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
    const { data } = await axios.get(endpoint_search)
    return dispatch({
      type: SEARCH_GAMES,
      payload: data.results
    })
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
