import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../store'

interface Prompt {
	id: any
	title: string
	description: string
	prompt: string
}

interface PromptsState {
	prompts: Prompt[]
}

const initialState: PromptsState = {
	prompts: [],
}

const promptsSlice = createSlice({
	name: 'prompts',
	initialState,
	reducers: {
		setPrompts: (state, action: PayloadAction<{ results: Prompt[] }>) => {
			state.prompts = action.payload.results
		},
	},
})

export const selectPrompts = (state: RootState) => state.prompts

export const { setPrompts } = promptsSlice.actions

export default promptsSlice.reducer
