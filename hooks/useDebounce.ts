import { useEffect, useState } from "react";


/**
 * Өгөгдсөн утгыг тодорхой хугацааны дараа шинэчилдэг custom hook.
 * 
 * @template T - Утгын төрөл.
 * @param {T} value - Шинэчлэх утга.
 * @param {number} delay - Хугацааны интервал (миллисекундээр).
 * @returns {T} - Тодорхой хугацааны дараа шинэчлэгдсэн утга.
 */
const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay || 500);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
}

export default useDebounce;