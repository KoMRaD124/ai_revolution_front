'use client'

import { useDeleteChatMutation } from '@/redux/features/conversations/chatApiSlice'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ButtonGroup from './ButtonGroup'

import { Chat } from '@/components/common/Icons'
import { IChatsList } from '@/types/chat.types'

interface IChatListItem {
	chat: IChatsList
}

export default function ChatListItem({ chat }: IChatListItem) {
	dayjs.extend(calendar)

	const [editing, setEditing] = useState(false)

	const isActive = usePathname() === `/conversations/chat/${chat.id}`

	const [hovered, setHovered] = useState(false)

	const [deleteChat] = useDeleteChatMutation()

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus()
			inputRef.current?.select()
		}
	}, [editing])

	const handleMouseEnter = () => {
		setHovered(true)
	}

	const handleMouseLeave = () => {
		setHovered(false)
		setEditing(false)
	}

	const handleDeleteClick = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
		event.stopPropagation()
		try {
			await deleteChat(chat.id).unwrap()
		} catch (error) {
			console.error('Failed to delete chat:', error)
		}
	}

	const buttons = [
		{ label: 'Cancel', icon: Trash2, onClick: handleDeleteClick },
	]

	return (
		<Link
			href={`/conversations/chat/${chat.id}`}
			className={`p-4 flex items-center duration-300 ease-linear transition-colors
			rounded-lg cursor-pointer hover:bg-bgchatmessage animation-slide-fade ${
				isActive ? 'bg-bgchatmessage' : ''
			}`}
			style={{marginBottom:"4px", width:"272px",zIndex:"2"}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className='text-sm w-full'>
				<div className='flex items-center'>
					<Chat className='mr-2' />
					<div className='flex'>{chat?.title}</div>
					{/* {dayjs(chat?.updatedAt).calendar(null, {
						sameDay: '[Сегодня в] HH:mm',
						lastDay: '[Вчера в] HH:mm',
						lastWeek: 'DD/MM/YYYY',
						sameElse: 'DD/MM/YYYY',
					})} */}
				</div>
				{hovered && (
					<div className='absolute flex top-3 right-2 justify-center'>
						<ButtonGroup buttons={buttons} />
					</div>
				)}
			</div>
		</Link>
	)
}
