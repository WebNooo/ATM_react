import React, { useReducer } from 'react'
import { MainLayout } from '../components'
import { AppContext, initialState, Reducer } from '../reducer'

export const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <AppContext.Provider
      value={{
        dispatch,
        state
      }}
    >
      <MainLayout />
    </AppContext.Provider>
  )
}
