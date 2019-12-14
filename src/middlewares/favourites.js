/* global fetch:false */
import get from 'lodash/get'
import {
  fetchFavouritesActionCreator,
  REHYDRATED,
  TOGGLE_FAVOURITE_TYPE
} from '../actions'
import { getFavouritesApiUrl } from '../selectors'

const fetchFavourites = async apiUrl => {
  const url = apiUrl
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  const favourites = get(data, ['results', 'favourites'])

  if (!response.ok || !data.success || !favourites) {
    const error = new Error(
      get(data, ['error', 'message']) || 'Failed to fetch favourites'
    )
    error.status = response.status
    throw error
  }

  return favourites
}

const toggleFavourite = async (favourites, apiUrl, entityId) => {
  const url = apiUrl + '/' + entityId
  const method = favourites.includes(entityId) ? 'delete' : 'put'
  const response = await fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  return data
}

export default store => next => action => {
  const ret = next(action)
  const state = store.getState()
  const favourites = state.favourites.favourites
  const apiUrl = getFavouritesApiUrl(state)

  if (action.type === REHYDRATED) {
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiUrl)))
  }

  if (action.type === TOGGLE_FAVOURITE_TYPE) {
    store.dispatch(fetchFavouritesActionCreator(toggleFavourite(favourites, apiUrl, action.payload.entityId)))
  }

  return ret
}
