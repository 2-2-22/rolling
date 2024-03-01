import { BUTTON_TYPE } from '../../../constants/button';
import styles from './ButtonToggle.module.scss';
import { useState } from 'react';

const ACTIVE_TYPE = {
  left: 'left',
  right: 'right',
};

function ButtonToggle({
  type = BUTTON_TYPE.button,
  onClick,
  textLeft = 'ON',
  textRight = 'OFF',
  active = ACTIVE_TYPE.left,
}) {
  const buttonType = BUTTON_TYPE[type] || BUTTON_TYPE.button;
  const defaultActive = ACTIVE_TYPE[active] || ACTIVE_TYPE.left;
  const [activeSwitch, setActiveSwitch] = useState(defaultActive);
  const switchList = [
    { type: ACTIVE_TYPE.left, text: textLeft },
    { type: ACTIVE_TYPE.right, text: textRight },
  ];

  const handleClick = () => {
    const next =
      activeSwitch === ACTIVE_TYPE.left ? ACTIVE_TYPE.right : ACTIVE_TYPE.left;
    setActiveSwitch(next);
    if (typeof onClick !== 'function') return;
    // 현재 활성화된 스위치(left, right)를 onClick의 인자로 넘겨준다.
    onClick(next);
  };

  return (
    <button type={buttonType} className={styles.button} onClick={handleClick}>
      {switchList.map(({ type, text }) => {
        const className = activeSwitch === type ? 'active' : '';
        return (
          <span key={type} className={`${styles.switch} ${styles[className]}`}>
            {text}
          </span>
        );
      })}
    </button>
  );
}

export default ButtonToggle;
