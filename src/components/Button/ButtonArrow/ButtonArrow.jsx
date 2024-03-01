import { BUTTON_TYPE } from '../../../constants/button';
import styles from './ButtonArrow.module.scss';

function ButtonArrow({
  type = BUTTON_TYPE.button,
  direction = 'left',
  className = '',
  onClick,
  disabled = false,
}) {
  const buttonType = BUTTON_TYPE[type] || BUTTON_TYPE.button;
  const classNames = `${styles.button} ${className}`;
  // content는 svg 작업이 끝나면 변경 필요합니다.
  const content = direction === 'left' ? '<' : '>';

  const handleClick = () => {
    if (typeof onClick !== 'function') return;
    onClick();
  };

  return (
    <button
      type={buttonType}
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default ButtonArrow;
