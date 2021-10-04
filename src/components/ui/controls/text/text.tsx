import React from 'react'

interface TextPropsTypes {
  style?: React.CSSProperties;
  styleLabel?: React.CSSProperties;
  value?: any;
  label?: string;
  type?: 'text' | 'number' | 'password';
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Text: React.FC<TextPropsTypes> = ({
  style,
  styleLabel,
  value,
  type = 'text',
  label,
  readonly = false,
  onChange,
  onKeyUp
}) => {
  return (
    <label className={'label'} style={styleLabel}>
      {label}
      <input
        className={'input'}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyUp}
        autoFocus={true}
        readOnly={readonly}
        style={style}
      />
    </label>
  )
}
