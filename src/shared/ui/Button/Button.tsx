'use client';

import { Slot } from '@radix-ui/react-slot';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import {
  base,
  sizeClass,
  variantClass,
  ButtonSize,
  ButtonVariant,
  stateClass,
} from './button.styles';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      className={cn(
        base,
        stateClass,
        variantClass(variant),
        sizeClass(size),
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
