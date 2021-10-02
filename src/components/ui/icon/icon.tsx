import React from 'react'

interface IconPropsType {
  name: 'Close' | 'Ok';
  color?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconPropsType> = ({
  name,
  color = 'black',
  style
}) => {
  const UiIcon = require('./icons')?.[name]
  return <UiIcon style={{ fill: color, ...style }} />
}
