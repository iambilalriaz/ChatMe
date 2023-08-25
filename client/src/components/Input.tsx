import classNames from 'classnames';
import { IInput } from '../types';
import { useId } from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  setValue,
  styles,
  onEnterPress,
}: IInput) => {
  const id = useId();
  return (
    <div className={classNames('text-dark mb-3', styles)}>
      <label className='font-medium ' htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        placeholder={placeholder}
        className='outline-none border border-dark p-1.5 w-full rounded'
        onKeyDown={onEnterPress}
      />
    </div>
  );
};

export default Input;
