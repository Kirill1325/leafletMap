import React from 'react'


interface InputProps {
  type?: 'text' | 'password' | 'email',
  placeholder?: string,
  value?: any,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}
