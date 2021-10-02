import React from 'react'
import { Button } from '../controls'
import { NUMPAD_BUTTON_STYLE, NUMPAD_BUTTONS } from '../../../constants'

interface NumpadPropsType {
  onChange?: (value: any) => void;
}

export const Numpad: React.FC<NumpadPropsType> = ({ onChange }) => {
  return (
    <div className="controls-numpad">
      {NUMPAD_BUTTONS.map((x) => (
        <Button key={x} onClick={onChange?.(x)} {...NUMPAD_BUTTON_STYLE}>
          {x}
        </Button>
      ))}
    </div>
  )
}
