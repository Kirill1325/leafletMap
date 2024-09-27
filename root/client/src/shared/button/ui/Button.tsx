import React from 'react'
import cl from './Button.module.scss'

interface ButtonProps {
    type: "submit" | "reset" | "button"
    variant: 'contained' | 'outlined',
    children: React.ReactNode,
    onClick?: () => void
}

export const Button = ({ type, variant, children, onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cl.button + ' ' + variant}
        >
            {children}
        </button>
    )
}
