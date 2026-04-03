/**
 * Button Component Template
 * Example of a well-structured TypeScript component
 */

import { FC } from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import './Button.scss';

interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  label: string;
  variant?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  label,
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  ...rest
}) => {
  return (
    <AntButton
      type={variant === 'primary' ? 'primary' : variant === 'secondary' ? 'default' : 'text'}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={className}
      {...rest}
    >
      {label}
    </AntButton>
  );
};
