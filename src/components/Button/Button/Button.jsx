import { BUTTON_SIZE, BUTTON_TYPE } from '../../../constants/button';
import styles from './Button.module.scss';

const STYLE_TYPE = {
  primary56: 'primary56',
  primary40: 'primary40',
  secondary: 'secondary',
  outlined56: 'outlined56',
  outlined40: 'outlined40',
  outlined36: 'outlined36',
  outlined28: 'outlined28',
};

function Button({
  children,
  type = BUTTON_TYPE.button,
  styleType = STYLE_TYPE.primary56,
  size = BUTTON_SIZE.free,
  onClick,
  className = '',
  disabled = false,
}) {
  const buttonType = BUTTON_TYPE[type] || BUTTON_TYPE.button;
  const buttonSize = BUTTON_SIZE[size] || BUTTON_SIZE.free;
  const pStyleType = STYLE_TYPE[styleType] || STYLE_TYPE.primary56;
  const classNames = `${styles.button} ${styles[buttonSize]} ${styles[pStyleType]} ${className}`;

  const handleClick = onClick
    ? () => {
        if (typeof onClick !== 'function') return;
        onClick();
      }
    : null;

  return (
    <button
      type={buttonType}
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
