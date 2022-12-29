import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { fetchStateReducer } from './fetchStateSlice';
import { messageReducer } from './messageSlice';
import { profilesReducer } from './profileSlice';
import { userReducer } from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const reducers = combineReducers({
  fetchState: fetchStateReducer,
  user: userReducer,
  profiles: profilesReducer,
  message: messageReducer,
});

// 永続化の設定
const persistConfig = {
  key: 'root', // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
  // whitelist: ['todos'] // Stateは`todos`のみStorageに保存する
  // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
};

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

// dispatch設定
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// persistor設定
export const persistor = persistStore(store);
