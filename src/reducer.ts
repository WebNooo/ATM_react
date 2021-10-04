import React from 'react'
import {
  banknotesType,
  calculateBanknotesType,
  messageType,
  screenTypes,
  stateType
} from './types'
import { amountBanknotes } from './utils'

export const initialState: stateType = {
  banknotes: {},
  amountBanknotes: 0,
  calculateBanknotes: {},
  message: {},
  screen: 'main',
  value: '0'
}

export const ActionTypes = {
  SET_BANKNOTES: 'SET_BANKNOTES',
  UPDATE_BANKNOTES: 'UPDATE_BANKNOTES',
  SET_CALCULATE_BANKNOTES: 'SET_CALCULATE_BANKNOTES',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SCREEN: 'SET_SCREEN',
  SET_VALUE: 'SET_VALUE'
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
    case ActionTypes.SET_BANKNOTES:
      return {
        ...state,
        banknotes: action.banknotes,
        amountBanknotes: amountBanknotes(action.banknotes)
      }
    case ActionTypes.UPDATE_BANKNOTES: {
      const banknotes = Object.keys(state.banknotes)
        .map(Number)
        .reduce((banknotes: any, k) => {
          banknotes[k] = action.banknotes[k]
            ? state.banknotes[k] - action.banknotes[k]
            : state.banknotes[k]
          return banknotes
        }, {})
      return {
        ...state,
        banknotes: { ...banknotes },
        amountBanknotes:
          state.amountBanknotes - amountBanknotes(action.banknotes)
      }
    }
    case ActionTypes.SET_CALCULATE_BANKNOTES:
      return {
        ...state,
        calculateBanknotes: action.result
      }
    case ActionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.message
      }
    case ActionTypes.SET_SCREEN:
      return {
        ...state,
        screen: action.screen
      }
    case ActionTypes.SET_VALUE:
      return {
        ...state,
        value: action.value
      }

    default:
      return state
  }
}

export const Actions = {
  setBanknotes: (banknotes: banknotesType) => ({
    type: ActionTypes.SET_BANKNOTES,
    banknotes
  }),
  updateBanknotes: (banknotes: banknotesType) => ({
    type: ActionTypes.UPDATE_BANKNOTES,
    banknotes
  }),
  setCalculateBanknotes: (result: calculateBanknotesType) => ({
    type: ActionTypes.SET_CALCULATE_BANKNOTES,
    result
  }),
  setScreen: (screen: screenTypes) => ({
    type: ActionTypes.SET_SCREEN,
    screen
  }),
  setMessage: ({ text, timeout }: messageType) => ({
    type: ActionTypes.SET_MESSAGE,
    message: {
      text,
      timeout
    }
  }),
  setValue: (value: string) => ({
    type: ActionTypes.SET_VALUE,
    value
  })
}
