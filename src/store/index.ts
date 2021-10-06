import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer  from './auth/auth.slice';

const migrations = {
  0: (state: any) => {
    return {
      ...state
    }
  },
}

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['purchase', 'invoice'],
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
}

const appReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
      return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();