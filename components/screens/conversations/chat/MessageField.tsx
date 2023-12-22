'use client'

import { Send } from '@/components/common/Icons'
import { Loader } from '@/components/screens/conversations'
import { useSaveMessageMutation } from '@/redux/features/conversations/chatApiSlice'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import style from "./style.module.scss"
export default function MessageField({
	message,
	setMessage,
}: {
	message: string
	setMessage: React.Dispatch<React.SetStateAction<string>>
}) {
	const { id } = useParams()
	const [isClicked, setIsClicked] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [isButtonHovered, setIsButtonHovered] = useState(false)

	const [saveMessage, { isLoading }] = useSaveMessageMutation()

	const inputAreaRef = useRef<any>()
	const textareaRef = useRef<HTMLDivElement>(null)
	

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				textareaRef.current &&
				!textareaRef.current.contains(event.target as Node)
			) {
				setIsClicked(false)
			}
		}
		if (inputAreaRef.current !== null){
			inputAreaRef.current.style.height = `${inputAreaRef.current.scrollHeight}px`;
		}
		
		

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [message])

	const onSubmit = async () => {
		if (!message || isLoading) return

		try {
			await saveMessage({ id, content: message, role: 'user' }).unwrap()
			setMessage('')
			localStorage.setItem('isStreaming', 'true')
			setIsClicked(true)
		} catch (error) {
			console.error('Error sending message:', error)
		}
	}

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = e.target
		textarea.style.height = '45px'
		textarea.style.height = `${textarea.scrollHeight}px`
		setMessage(e.target.value)
	}

	const handleTextareaFocus = () => {
		setIsClicked(true)
		setIsHovered(true)
		if (textareaRef.current) {
			textareaRef.current.style.borderColor = '#4A7AFF'
		}
	}

	const handleTextareaBlur = () => {
		setIsClicked(false)
		setIsHovered(false)
		if (textareaRef.current) {
			textareaRef.current.style.borderColor = 'initial'
		}
	}

	const handleButtonMouseEnter = () => {
		setIsButtonHovered(true)
	}

	const handleButtonMouseLeave = () => {
		setIsButtonHovered(false)
	}

	return (
		<div className={style.MessageFieldInputContainer}>
			
			<div className='w-full flex flex-col items-center justify-center'>
				<div
					ref={textareaRef}
					className={`w-full flex items-center justify-center border rounded-lg border-textlight p-2 ${
						isClicked
							? 'border-opacity-100 border-blue-500'
							: isHovered
							? 'border-opacity-70'
							: 'border-opacity-40'
					}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<textarea
						placeholder='Напишите Ваш запрос'
						value={message}
						onChange={handleTextareaChange}
						onFocus={handleTextareaFocus}
						onBlur={handleTextareaBlur}
						ref={inputAreaRef}
						className={`w-full field ${isClicked ? 'border-blue-500' : ''}`}
						style={{
							height:"45px",
							background: '#2F3441',
							color: 'inherit',
							padding: '10px',
							border: 'none',
							overflowY: 'auto',
							resize: 'none',
							borderRadius: '10px',
							maxHeight: '146px',
							boxShadow: isClicked ? 'none' : 'initial',
							transition: 'border-color 0.3s ease-in-out',
						}}
					/>

					<button
						onClick={onSubmit}
						disabled={!message || isLoading}
						onMouseEnter={handleButtonMouseEnter}
						onMouseLeave={handleButtonMouseLeave}
						className={`${
							isButtonHovered ? 'bg-gray-700' : ''
						} rounded-full p-2 focus:outline-none hover:bg-gray-700 flex items-center justify-center`}
						style={{
							width: '40px',
							height: '40px',
							borderRadius: '8px',
							cursor:"pointer"
						}}
					>
						{(isLoading && <Loader />) || (
							<Send className='text-textlight text-opacity-40 hover:text-opacity-100' />
						)}
					</button>
				</div>
				<p className='text-sm text-textlight text-opacity-40 pt-3'>
					Сервис может допускать ошибки, проверяйте полученную информацию!
				</p>
			</div>
		</div>
	)
}
