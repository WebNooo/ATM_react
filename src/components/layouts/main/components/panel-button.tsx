import React from 'react'
import { Button } from '../../../ui'

interface PanelButtonPropsType {
  onClick: () => void;
}

export const PanelButton: React.FC<PanelButtonPropsType> = ({
  children,
  onClick
}) => {
  return (
    <Button
      onClick={onClick}
      width={180}
      height={40}
      margin={20}
      style={{
        justifyContent: 'flex-start',
        paddingLeft: 20
      }}
    >
      {children}
    </Button>
  )
}
