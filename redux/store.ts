import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import chatSliceReducer from './features/conversations/chatSlice'
import promptsSliceReducer from './features/prompts/promptsSlice'
import { apiSlice } from './services/apiSlice'

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		prompts: promptsSliceReducer,
		chats: chatSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<(typeof store)['getState']>
export type AppDispatch = (typeof store)['dispatch']
