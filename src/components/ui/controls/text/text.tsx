import React from 'react'

interface TextPropsTypes {
  value?: any;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Text: React.FC<TextPropsTypes> = ({
  value,
  label,
  onChange,
  onKeyUp
}) => {
  return (
    <label className={'label'}>
      {label}
      <input
        className={'input'}
        type="text"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        autoFocus={true}
      />
    </label>
  )
}
