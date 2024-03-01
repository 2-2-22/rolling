import { BUTTON_TYPE } from '../../../constants/button';
import styles from './ButtonPlus.module.scss';

function ButtonPlus({
  type = BUTTON_TYPE.button,
  className = '',
  onClick,
  disabled = false,
}) {
  const buttonType = BUTTON_TYPE[type] || BUTTON_TYPE.button;
  const classNames = `${styles.button} ${className}`;

  const handleClick = () => {
    if (typeof onClick !== 'function') return;
    onClick();
  };

  // button의 내용은 svg 작업이 끝나면 변경 필요합니다.
  return (
    <button
      type={buttonType}
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
    >
      +
    </button>
  );
}

export default ButtonPlus;
