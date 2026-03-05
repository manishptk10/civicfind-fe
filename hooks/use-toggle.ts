import { useState, useCallback } from 'react';

export function useToggle(initialValue = false) {
  const [open, setOpen] = useState(initialValue);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const openTrue = useCallback(() => {
    setOpen(true);
  }, []);

  const openFalse = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    setOpen,
    toggle,
    openTrue,
    openFalse,
  };
}
