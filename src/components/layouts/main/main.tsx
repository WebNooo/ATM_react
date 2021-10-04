import React, { useCallback, useContext, useEffect } from 'react'
import '../../../assets/styles/app.scss'
import { Actions, AppContext } from '../../../reducer'
import { KITS } from '../../../constants'
import { Screen, Panel } from './components'
import { clearValue } from '../../../utils'
import { useBanknotes } from '../../../hooks/useBanknotes'

export const Main: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)
  const { calculate } = useBanknotes()

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        console.log(calculate())
      } else {
        dispatch(Actions.setValue(clearValue(event.key, state.value)))
      }
    },
    [calculate, dispatch, state.value]
  )

  useEffect(() => {
    console.log('mount')
    dispatch(Actions.setBanknotes(KITS[0]))
  }, [dispatch])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyUp)
    }
  }, [handleKeyUp])

  return (
    <div className="container">
      <Screen />
      <Panel />
    </div>
  )
}
