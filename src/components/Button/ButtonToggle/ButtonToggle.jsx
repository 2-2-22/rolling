// import { BUTTON_TYPE } from '../../../constants/button';
import styles from './ButtonToggle.module.scss';
import { useState } from 'react';
import isFunction from '../../../utils/isFunction';

const ACTIVE_TYPE = {
  left: 'left',
  right: 'right',
};

function ButtonToggle({
  textLeft = 'ON',
  textRight = 'OFF',
  active = ACTIVE_TYPE.left,
  onClick,
  ...rest
}) {
  const [activeSwitch, setActiveSwitch] = useState(active);
  const switchList = [
    { type: ACTIVE_TYPE.left, text: textLeft },
    { type: ACTIVE_TYPE.right, text: textRight },
  ];

  const handleClick = () => {
    const next =
      activeSwitch === ACTIVE_TYPE.left ? ACTIVE_TYPE.right : ACTIVE_TYPE.left;
    setActiveSwitch(next);
    if (!isFunction(onClick)) return;
    // 현재 활성화된 스위치(left, right)를 onClick의 인자로 넘겨준다.
    onClick(next);
  };

  return (
    <button className={styles.button} onClick={handleClick} {...rest}>
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
