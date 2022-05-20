import {classNames} from '~/utils'
import React from 'react'

const sizeClasses = {
  xs: 'px-2.5 py-1.5 leading-4 text-xs',
  sm: 'px-3 py-2 text-sm font-medium',
  md: 'px-4 py-2 text-sm font-medium',
  lg: 'px-4 py-2 text-base font-medium',
  xl: 'px-6 py-3 text-base font-medium',
}
const basePrimaryStyle = classNames(
  'inline-flex items-center rounded border bg-yellow-600 border-transparent text-white shadow-sm',
  'hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2'
)

const baseSecondaryStyle = classNames(
  'inline-flex items-center border border-transparent shadow rounded text-yellow-500 bg-white',
  'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
)

interface ButtonProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: React.MouseEventHandler
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
}

export const Button: React.FC<ButtonProps> = ({
  size,
  variant = 'primary',
  href,
  type = 'button',
  className,
  children,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const base = variant === 'primary' ? basePrimaryStyle : baseSecondaryStyle
  const sizeStyle = sizeClasses[size]
  const classes = classNames(base, sizeStyle, className)
  return href ? (
    <a href={href} className={classes} {...rest}>
      {leftIcon
        ? React.cloneElement(leftIcon, {
            test: '123',
            className: '-ml-2 mr-2 h-4 w-4',
            'aria-hidden': true,
          })
        : null}
      {children}
      {rightIcon ? React.cloneElement(rightIcon, {'aria-hidden': true}) : null}
    </a>
  ) : (
    <button type={type} className={classes} {...rest}>
      {leftIcon ? leftIcon : null}
      {children}
      {rightIcon ? rightIcon : null}
    </button>
  )
}
