import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'h-full w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-200',
          'text-[12px] font-black md:text-[13px]', // 기본 폰트 스타일
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
