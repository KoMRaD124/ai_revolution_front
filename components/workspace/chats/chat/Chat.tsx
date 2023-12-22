'use client'
import { Loader, Message, MessageField } from '@/components/workspace/index'
import { useGetMessageListQuery } from '@/redux/features/conversations/chatApiSlice'
import {
	selectCurrentChat,
	setCurrentChat,
} from '@/redux/features/conversations/chatSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { UUID } from 'crypto'
import isEqual from 'lodash/isEqual'
import { useEffect, useRef } from 'react'

export default function Chat({ id }: { id?: UUID }) {
	const dispatch = useAppDispatch()
	const currentChat = useAppSelector(selectCurrentChat)

	const { data: messagesList, isLoading } = useGetMessageListQuery({ id: id })

	useEffect(() => {
		if (messagesList && !isEqual(messagesList, currentChat)) {
			dispatch(setCurrentChat(messagesList))
		}
	}, [messagesList, dispatch, currentChat])

	const messagesContainerRef = useRef<HTMLDivElement>(null)

	return (
		<div className='relative w-full h-full bg-bgchatmessage '>
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<Loader />
				</div>
			) : (
				<>
					<div
						ref={messagesContainerRef}
						className='p-4 border-t border-darkgrey'
						style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}
					>
						{messagesList?.messages.map((message) => (
							<Message key={message.id} message={message} />
						))}
					</div>
				</>
			)}
			<MessageField />
		</div>
	)
}
