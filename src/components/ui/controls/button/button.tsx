import React from 'react'

interface ButtonPropsType {
  width?: number;
  height?: number;
  disabled?: boolean;
  margin?: string | number;
  onClick?: any;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonPropsType> = ({
  children,
  width,
  height,
  disabled = false,
  margin,
  style,
  onClick
}) => {
  return (
    <button
      className="button"
      style={{
        width,
        height,
        margin,
        ...style
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
