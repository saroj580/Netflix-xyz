import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.log('Error saving state to localStorage:', err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store

