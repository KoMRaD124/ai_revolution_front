'use client'

import {
	useCreateChatMutation,
	useGetChatListQuery,
} from '@/redux/features/conversations/chatApiSlice'

import { ChatListItem, Loader } from '@/components/workspace/index'
import {
	addChat,
	getChatList,
	selectChats,
} from '@/redux/features/conversations/chatSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import isEqual from 'lodash/isEqual'
import { useEffect, useState } from 'react'

export default function ChatsList() {
	const dispatch = useAppDispatch()

	const { data: chatsList, isLoading, isFetching } = useGetChatListQuery()
	const [createChat, { isLoading: isCreateChatLoading }] =
		useCreateChatMutation()

	const chats = useAppSelector(selectChats)

	const [isInitialLoad, setInitialLoad] = useState(true)

	useEffect(() => {
		if (chatsList && !isEqual(chatsList, chats)) {
			dispatch(getChatList(chatsList))
		}
		setInitialLoad(false)
	}, [chatsList, dispatch, chats])

	const handleCreateChat = async () => {
		try {
			const newChat = await createChat({}).unwrap()
			dispatch(addChat(newChat))
		} catch (error) {
			console.error('Failed to create chat:', error)
		}
	}

	return (
		<div className='h-screen flex flex-col'>
			<div className='border-b border-darkgrey flex justify-center'>
				<button
					className='w-full bg-opacity-0 hover:bg-greyblue text-white text-sm py-2 px-4 rounded m-2'
					onClick={handleCreateChat}
					disabled={isCreateChatLoading}
				>
					Создать чат
				</button>
			</div>
			<div className='flex-1 overflow-y-auto  chatsContainer'>
				{isInitialLoad ? (
					<div className='flex items-center justify-center h-full'>
						<Loader />
					</div>
				) : (
					chats.map((chat) => {
						return <ChatListItem key={chat.id} chat={chat} />
					})
				)}
			</div>
		</div>
	)
}
