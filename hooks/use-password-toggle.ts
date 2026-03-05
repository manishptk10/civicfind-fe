import { useState, useCallback } from 'react';

export function usePasswordToggle(initial = false) {
  const [visible, setVisible] = useState(initial);

  const toggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const inputType = visible ? 'text' : 'password';

  return {
    visible,
    toggle,
    inputType,
  };
}
