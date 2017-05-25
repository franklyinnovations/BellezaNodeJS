import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_ERRORS = Map()


export const errorsReducer = (state = INITIAL_ERRORS, action) => {

  if(action.type.includes('ERROR') && action.payload.response.status == 422){
    let res = action.payload.response.data
    return state.withMutations(map => {
      res.forEach(error => map.set(error.path, error.message))
    })
  }

  if(action.type === types.RESET_ERRS){
    if(action.payload.key){
      return state.delete(action.payload.key)
    }else{
      return state.clear()
    }
  }

  return state
}
