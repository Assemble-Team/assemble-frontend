import { cn } from '@/shared/lib/utils';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'soft';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

export const base =
  'flex shrink-0 whitespace-nowrap gap-x-1.5 items-center rounded-3xl font-black transition-all duration-300';

export const stateClass = cn(
  'data-[active=true]:bg-brand-50',
  'data-[active=true]:text-brand-600',
  'data-[active=true]:border-brand-500'
);

export const variantClass = (variant: ButtonVariant) =>
  cn({
    'bg-brand-500 text-white hover:bg-brand-600 active:scale-95':
      variant === 'primary',
    'bg-brand-50 text-brand-600 hover:bg-brand-100 active:bg-brand-200':
      variant === 'soft',
    'text-gray-500 border border-gray-100 hover:bg-gray-50 hover:text-gray-900':
      variant === 'secondary',
    'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50':
      variant === 'ghost',
    'bg-white border border-brand-500 text-brand-500 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-600 active:scale-95':
      variant === 'outline',
  });

export const sizeClass = (size: ButtonSize) =>
  cn({
    'px-3.5 py-1.5 text-sm': size === 'xs',
    'px-4 py-2 text-sm': size === 'sm',
    'px-6 py-3 text-sm': size === 'md',
    'px-8 py-3 text-base': size === 'lg',
    'p-3': size === 'icon',
  });
