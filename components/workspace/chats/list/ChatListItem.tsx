'use client'

import {
	useConfigChatMutation,
	useDeleteChatMutation,
} from '@/redux/features/conversations/chatApiSlice'
import { IChat } from '@/types/chat.types'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import { PencilLine, Save, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ButtonGroup from './ButtonGroup'

import { IChatsList } from '@/types/chat.types'

interface IChatListItem {
	chat: IChatsList
}

export default function ChatListItem({ chat }: IChatListItem) {
	dayjs.extend(calendar)

	const [editing, setEditing] = useState(false)
	const [newTitle, setNewTitle] = useState(chat?.title)

	const isActive = usePathname() === `/conversations/chat/${chat.id}`

	const [hovered, setHovered] = useState(false)

	const [deleteChat] = useDeleteChatMutation()
	const [updateChatConfig, { isLoading }] = useConfigChatMutation()

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

	const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
		setEditing(true)
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

	function handleTitleChange(e: any) {
		setNewTitle(e.target.value)
	}

	const handleAcceptClick = async () => {
		const config: Partial<IChat> = {
			id: chat.id,
			title: newTitle,
		}

		try {
			await updateChatConfig(config).unwrap()
		} catch (error) {
			console.error('Failed to update chat config:', error)
		}
		setEditing(false)
	}

	function handleCancelClick() {
		setNewTitle(chat.title)
		setEditing(false)
	}

	const buttons = editing
		? [
				{ label: 'Save', icon: Save, onClick: handleAcceptClick },
				{ label: 'Cancel', icon: X, onClick: handleCancelClick },
		  ]
		: [
				{ label: 'Save', icon: PencilLine, onClick: handleEditClick },
				{ label: 'Cancel', icon: Trash2, onClick: handleDeleteClick },
		  ]

	return (
		<Link
			href={`/workspace/chat/${chat.id}`}
			className={`p-4 flex items-center border-b border-grey duration-300 ease-linear transition-colors hover:bg-greyblue animation-slide-fade ${
				isActive ? 'bg-greyblue' : ''
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className='text-sm w-full'>
				<div className='flex items-center justify-between'>
					{editing ? (
						<div className='flex'>
							<input
								className='absolute w-full text-sm bg-transparent outline-none focus:outline-none focus:ring-0'
								style={{
									padding: 0,
									boxShadow: 'none',
									fontFamily: 'inherit',
									fontSize: 'inherit',
									color: 'inherit',
									lineHeight: 'inherit',
									height: '1.2em',
								}}
								ref={inputRef}
								value={newTitle}
								onChange={handleTitleChange}
							/>
						</div>
					) : (
						<div className='flex'>{chat?.title}</div>
					)}
					{dayjs(chat?.updatedAt).calendar(null, {
						sameDay: '[Сегодня в] HH:mm',
						lastDay: '[Вчера в] HH:mm',
						lastWeek: 'DD/MM/YYYY',
						sameElse: 'DD/MM/YYYY',
					})}
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
