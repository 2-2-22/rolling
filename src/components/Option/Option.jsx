import OptionPicker from './OptionPicker';
import styles from './Option.module.scss';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';

function Option({ type }) {
  //type은 image, color중 하나
  const colorChart = ['orange', 'purple', 'blue', 'green'];
  const backgroundImgChart = useFetch(`/background-images/`).imageUrls;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClicked = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className={styles.options}>
      {type === 'color' &&
        colorChart?.map((color) => (
          <OptionPicker
            color={color}
            key={color}
            isSelected={selectedOption === color}
            onOptionClick={() => handleOptionClicked(color)}
          />
        ))}
      {type === 'image' &&
        backgroundImgChart?.map((img) => (
          <OptionPicker
            backgroundImg={img}
            key={img}
            isSelected={selectedOption === img}
            onOptionClick={() => handleOptionClicked(img)}
          />
        ))}
    </div>
  );
}

export default Option;
