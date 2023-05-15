import axios from 'axios'
import { GET_GAMES } from './types-action'

export const getGames = () => {
  const endpoint = `http://localhost:3001/videogames`

  return async (dispatch) => {
    const { data } = await axios.get(endpoint)
    return dispatch({
      type: GET_GAMES,
      payload: data.results
    })
  }
}
