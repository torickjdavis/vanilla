import { useState } from 'react';

export const useToggle = (initial) => {
  const [state, setState] = useState(initial);
  // TODO potentially find a better set of names for functions
  const toggle = () => setState(!state);
  const enable = () => setState(true);
  const disable = () => setState(false);
  return { state, toggle, enable, disable, set: setState };
};

export default useToggle;
