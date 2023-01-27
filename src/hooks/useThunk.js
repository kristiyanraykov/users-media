const { useState, useCallback } = require('react');
const { useDispatch } = require('react-redux');

export function useThunk(thunk) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const runThunk = useCallback(
    (arg) => {
      setIsLoading(true);
      dispatch(thunk(arg)) // .then() always triggers, even if the promise is rejected.
        .unwrap() // This creates a new promise that follows the conventional rules.
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
}
