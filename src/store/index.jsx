// Simple store using context - can be replaced with Redux Toolkit later
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  students: [],
  predictions: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_STUDENTS':
      return { ...state, students: action.payload, loading: false };
    case 'SET_PREDICTIONS':
      return { ...state, predictions: action.payload, loading: false };
    default:
      return state;
  }
}

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
