'use client'

import { Field, Loader } from '@/components/screens/conversations'
import { useSaveMessageMutation } from '@/redux/features/conversations/chatApiSlice'
import { ArrowRightToLine, Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function MessageField() {
	const { id } = useParams()

	const [message, setMessage] = useState('')

	const [saveMessage, { isLoading }] = useSaveMessageMutation()

	const onSubmit = async () => {
		if (!message || isLoading) return

		try {
			await saveMessage({ id, content: message, role: 'user' }).unwrap()
			setMessage('')
			localStorage.setItem('isStreaming', 'true')
		} catch (error) {
			console.error('Error sending message:', error)
		}
	}

	return (
		<div className='absolute left-1/2 transform -translate-x-1/2 bottom-4 p-4 flex items-center justify-center w-3/4 text-white'>
			<div className='w-full flex flex-col items-center justify-center'>
				<div className='w-full flex items-center justify-center border rounded-lg border-textlight border-opacity-40 px-2'>
					<Field
						placeholder='Напишите Ваш запрос'
						Icon={ArrowRightToLine}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') onSubmit()
						}}
						className='w-full'
					/>
					<button
						onClick={onSubmit}
						disabled={!message || isLoading}
						className='hover:text-primary transition-colors pr-4'
					>
						{(isLoading && <Loader />) || (
							<Send
								size={24}
								className='text-textlight text-opacity-40 hover:text-opacity-100'
							/>
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
