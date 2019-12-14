import { ActionType } from 'redux-promise-middleware'
import { FETCH_FAVOURITES_TYPE } from '../actions'

const initialState = {
  favourites: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Pending}`:
      return {
        ...state,
        busy: true
      }
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Fulfilled}`:
      return {
        ...state,
        busy: false,
        error: undefined,
        favourites: action.payload
      }
    case `${FETCH_FAVOURITES_TYPE}_${ActionType.Rejected}`:
      return {
        ...state,
        busy: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer
