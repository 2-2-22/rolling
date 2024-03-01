import styles from './Option.module.scss';
import Check from '../../assets/images/Check';
import { useState } from 'react';

function OptionPicker({
  color = 'white',
  backgroundImg = null,
  onOptionClick,
  isSelected,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleClick = () => {
    if (!isSelected) {
      onOptionClick();
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={styles.optionPicker}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${styles.checkWrapper} ${styles[color]} `}
        onClick={handleClick}
        style={backgroundImg ? style : {}}
      ></div>
      <div
        className={
          isSelected
            ? styles.checkClicked
            : isHovered
              ? styles.checkHover
              : styles.check
        }
      >
        {(isSelected || isHovered) && <Check />}
      </div>
    </div>
  );
}
export default OptionPicker;
