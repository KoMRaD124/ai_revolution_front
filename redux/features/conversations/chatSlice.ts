import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../store'
import { logout as logoutAction } from '../authSlice'

import { IChat, IChatsList } from '@/types/chat.types'

interface ChatsState {
	chatsList: IChatsList[]
	currentChat?: IChat
}

const initialState: ChatsState = {
	chatsList: [],
	currentChat: undefined,
}

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		getChatList: (state, action: PayloadAction<IChatsList[]>) => {
			state.chatsList = action.payload
		},
		clearChats: (state) => {
			state.chatsList = []
		},
		addChat: (state, action: PayloadAction<IChatsList>) => {
			state.chatsList.push(action.payload)
		},
		setCurrentChat: (state, action: PayloadAction<IChat>) => {
			state.currentChat = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutAction, (state) => {
			state.chatsList = []
		})
	},
})

export const selectChats = (state: RootState) => state.chats.chatsList
export const selectCurrentChat = (state: RootState) => state.chats.currentChat

export const { getChatList, addChat, setCurrentChat } = chatSlice.actions

export default chatSlice.reducer
