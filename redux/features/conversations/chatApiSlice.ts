import { UUID } from 'crypto'
import { apiSlice } from '../../services/apiSlice'

import { IChat, IChatConfig, IChatsList } from '@/types/chat.types'

export const chatApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChatList: builder.query<IChatsList[], void>({
			query: () => '/conversations/',
			providesTags: [{ type: 'Chat', id: 'LIST' }],
		}),
		createChat: builder.mutation<IChatsList, Partial<IChatsList>>({
			query: (newChatData) => ({
				url: '/conversations/',
				method: 'POST',
				body: newChatData,
			}),
			invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
		}),
		deleteChat: builder.mutation<{ success: boolean; id: UUID }, UUID>({
			query: (id) => ({
				url: `/conversations/${id}/delete/`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
		}),
		configChat: builder.mutation<void, Partial<IChatConfig>>({
			query: (config) => ({
				url: `/conversations/${config.id}/config/`,
				method: 'PATCH',
				body: config,
			}),
			invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
		}),
		getMessageList: builder.query<IChat, { id: UUID | null }>({
			query: ({ id }) => `/conversations/${id}/messages/list/`,
			providesTags: [{ type: 'CurrentChat', id: 'LIST' }],
		}),
		saveMessage: builder.mutation({
			query: ({ id, content, role }) => ({
				url: `/conversations/${id}/messages/create/`,
				method: 'POST',
				body: { content, role },
			}),
			invalidatesTags: [
				{ type: 'CurrentChat', id: 'LIST' },
				{ type: 'Chat', id: 'LIST' },
			],
		}),
		deleteMessage: builder.mutation({
			query: ({ id, messageId }) => ({
				url: `/conversations/${id}/${messageId}/delete/`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'CurrentChat', id: 'LIST' }],
		}),
	}),
})

export const {
	useGetChatListQuery,
	useCreateChatMutation,
	useConfigChatMutation,
	useDeleteChatMutation,
	useSaveMessageMutation,
	useDeleteMessageMutation,
	useGetMessageListQuery,
} = chatApiSlice
