// import { useDispatch, useSelector, useStore } from 'react-redux'
// import type { AppDispatch, AppStore, RootState } from './store'

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()
// export const useAppStore = useStore.withTypes<AppStore>()

import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

// Custom hook for `useDispatch` with type
export const useAppDispatch: () => AppDispatch = useDispatch;

// Custom hook for `useSelector` with type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook for `useStore` with type
export const useAppStore: () => AppStore = useStore;
