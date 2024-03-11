import OptionPicker from './OptionPicker';
import styles from './Option.module.scss';
import useFetch from '../../hooks/useFetch';
import { LoadingPage } from '../../pages/LoadingPage';
import { useState } from 'react';

function Option({ type }) {
  //type은 image, color중 하나
  const colorChart = ['beige', 'purple', 'blue', 'green'];
  const { data, isLoading } = useFetch(`/background-images/`);
  const [selectedOption, setSelectedOption] = useState('beige');

  if (isLoading || !data) return <LoadingPage />;

  let Imgdata = data.imageUrls;

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
        Imgdata?.map((img) => (
          <OptionPicker
            backgroundImg={img}
            key={img}
            isSelected={selectedOption === img}
            onOptionClick={() => handleOptionClicked(img)}
          />
        ))}

      <input
        type="hidden"
        name="backgroundColor"
        value={type === 'color' ? selectedOption : 'beige'}
      />
      <input
        type="hidden"
        name="backgroundImageURL"
        value={type === 'image' ? selectedOption : ''}
      />
    </div>
  );
}

export default Option;
