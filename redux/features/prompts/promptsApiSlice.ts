import { apiSlice } from '../../services/apiSlice'

interface Prompt {
	id: any
	title: string
	description: string
	prompt: string
}

interface ApiResponse {
	count: number
	next: null | string
	previous: null | string
	results: Prompt[]
}

export const promptsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPrompts: builder.query<ApiResponse, void>({
			query: () => '/prompts/systemprompts/',
		}),
	}),
})

export const { useGetPromptsQuery } = promptsApiSlice
