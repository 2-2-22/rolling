import { useEffect } from 'react';
import isFunction from '../utils/isFunction';

function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      if (!isFunction(callback)) return;
      if (!ref?.current) return;
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
