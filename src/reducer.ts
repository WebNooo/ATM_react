import React from 'react'
import { cashType, stateType } from './types'

export const initialState: stateType = {
  cash: null
}

export const ActionTypes = {
  SET_CASH: 'SET_CASH',
  UPDATE_CASH: 'UPDATE_CASH'
}

export const AppContext = React.createContext<{
  state: stateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
})

export const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_CASH:
      return {
        ...state,
        cash: action.cash
      }
    case ActionTypes.UPDATE_CASH:
      return { ...state }
    default:
      return state
  }
}

export const Actions = {
  setCash: (cash: cashType) => ({
    type: ActionTypes.SET_CASH,
    cash
  }),
  updateCash: (cash: cashType) => ({
    type: ActionTypes.UPDATE_CASH,
    cash
  })
}
