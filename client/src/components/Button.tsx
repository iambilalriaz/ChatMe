import classNames from 'classnames';
import { IButton } from '../types';

const Button = ({ label, onClick, variant = 'primary', styles }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        {
          'bg-primary text-light': variant === 'primary',
        },
        'px-4 py-1.5 rounded font-semibold',
        styles
      )}
    >
      {label}
    </button>
  );
};

export default Button;
