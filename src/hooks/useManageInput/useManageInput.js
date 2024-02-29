import { useState } from 'react';

const useManageInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isBeenFocused, setIsBeenFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setIsBeenFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseActive = (e) => {
    if (e.target.value) setIsActive(true);
    else setIsActive(false);
  };

  const decideInputClass = () => {
    if (isFocused) return 'input--focused';
    else if (isActive) return 'input--active';
    else if (isBeenFocused && !isActive) return 'input--error';
    else return 'input--inactive';
  };

  const decidePClass = () => {
    if (!isFocused && isBeenFocused && !isActive) return 'p--error';
    else return 'p--default';
  };
  return {
    handleFocus,
    handleBlur,
    decideInputClass,
    handleMouseActive,
    decidePClass,
  };
};

export default useManageInput;