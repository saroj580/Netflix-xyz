import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    
    // Reset loading state to false when loading from localStorage
    if (parsedState.user) {
      parsedState.user.loading = false;
    }
    
    return parsedState;
  } catch (err) {
    console.log('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    // Create a copy of the state to modify
    const stateToSave = JSON.parse(JSON.stringify(state));
    
    // Reset loading state to false before saving
    if (stateToSave.user) {
      stateToSave.user.loading = false;
    }
    
    const serializedState = JSON.stringify(stateToSave);
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

