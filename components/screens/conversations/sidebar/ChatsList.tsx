'use client'

import {
	useCreateChatMutation,
	useGetChatListQuery,
} from '@/redux/features/conversations/chatApiSlice'

import { useLogoutMutation } from '@/redux/features/authApiSlice'
import { logout as setLogout } from '@/redux/features/authSlice'

import { LogOut, Plus } from '@/components/common/Icons'
import { ChatListItem, Loader } from '@/components/screens/conversations'
import {
	addChat,
	getChatList,
	selectChats,
} from '@/redux/features/conversations/chatSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import isEqual from 'lodash/isEqual'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from  "@/public/CREACRAFT.svg"
import sideTop from "@/public/sidebarTop.svg"
import sideBot from "@/public/sidebarBottom.svg"
import userAva from "@/public/no-avatar.png"

export default function ChatsList() {
	const dispatch = useAppDispatch()
	const [logout] = useLogoutMutation()

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

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout())
			})
	}

	return (
		<div className='h-screen flex flex-col px-6 relative' >
			<div className='py-8'>
				<p className='text-textlight font-bold'><Image src={logo} alt='DEEPLINE'></Image></p>
			</div>
			<div
				className='px-4 py-2.5 rounded-xl border border-textlight border-opacity-40  text-textlight text-opacity-40 justify-between items-center inline-flex
			hover:border-opacity-100 hover:text-opacity-100
			'
			style={{marginTop:"12px"}}
			>
				<button
					className='w-full flex justify-between bg-opacity-0 text-sm'
					style={{width:"255px"}}
					onClick={handleCreateChat}
					disabled={isCreateChatLoading}
					
				>
					Создать чат
					<Plus />
				</button>
			</div>
			<div className='flex-1 overflow-y-auto pt-4' style={{zIndex:"2"}}>
				{isInitialLoad ? (
					<div className='flex items-center justify-center h-full'>
						<Loader />
					</div>
				) : chats && chats.length > 0 ? (
					chats.map((chat) => <ChatListItem key={chat.id} chat={chat} />)
				) : (
					<div className='flex flex-col items-center justify-center h-full text-center'>
						{/* <div className='rounded-full bg-textlight p-10 m-4' /> */}
						<Image className='' src={userAva} alt='user' style={{marginBottom:"16px",borderRadius:"28px"}}/>
						<p>Здесь будут отображаться созданные чаты</p>
					</div>
				)}
			</div>
			<div
				className='border-b border-textlight border-opacity-40
			justify-center items-center py-10'
			/>
			<button
				onClick={handleLogout}
				className='flex justify-start items-center py-10  text-textlight text-opacity-40 hover:text-opacity-100'
			>
				<LogOut />
				<div className='pl-4'>Выйти</div>
			</button>
			<div style={{position:"absolute", top:"79px", right:"0", pointerEvents:"none",zIndex:"1"}}><Image src={sideTop} alt=''/></div>
			<div  style={{position:"absolute", bottom:"40px", right:"0", pointerEvents:"none"}}><Image src={sideBot} alt=''/></div>
		</div>
	)
}
