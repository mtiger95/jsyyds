import {useCallback, useState} from 'react';

import useUnmountedRef from './useUnmountedRef';

export default function useSafeState(initialState) {
  const unmountedRef = useUnmountedRef();

  const [state, setState] = useState(initialState);

  const setCurState = useCallback(
    (curState) => {
      if (unmountedRef.current) return;

      setState(curState);
    },
    [unmountedRef]
  );

  return [state, setCurState];
}
