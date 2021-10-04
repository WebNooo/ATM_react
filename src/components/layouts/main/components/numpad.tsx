import React, { useCallback, useContext } from 'react'
import { NUMPAD_BUTTON_STYLE, NUMPAD_BUTTONS } from '../../../../constants'
import { Button } from '../../../ui'
import { Actions, AppContext } from '../../../../reducer'
import { clearValue } from '../../../../utils'

export const Numpad: React.FC = () => {
  const { state, dispatch } = useContext(AppContext)
  const handleClick = useCallback(
    (x: string | number) => () => {
      dispatch(Actions.setValue(clearValue(x, state.value)))
    },
    [dispatch, state.value]
  )

  return (
    <div className="controls-numpad">
      {NUMPAD_BUTTONS.map((x) => (
        <Button key={x} onClick={handleClick(x)} {...NUMPAD_BUTTON_STYLE}>
          {x}
        </Button>
      ))}
    </div>
  )
}
