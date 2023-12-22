'use client'

import { useSaveMessageMutation } from '@/redux/features/conversations/chatApiSlice'
import { IMessage } from '@/types/chat.types'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { SSE } from 'sse'

export default function Message({ message }: { message: IMessage }) {
	const { id } = useParams()
	const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/v1`
	const isSender = message.role === 'user'

	useEffect(() => {
		const isStreamingFromStorage =
			localStorage.getItem('isStreaming') === 'true'

		if (isStreamingFromStorage) {
			localStorage.setItem('isStreaming', 'false')
			startStreaming()
		}
	}, [])

	let [isLoading, setIsLoading] = useState(false)
	let [result, setResult] = useState('')
	const [saveMessage] = useSaveMessageMutation()

	const resultRef = useRef<string | null>(null)

	useEffect(() => {
		resultRef.current = result
	}, [result])

	let startStreaming = async () => {
		setIsLoading(true)
		setResult('')

		let source = new SSE(`${baseUrl}/conversations/${id}/stream/`, {
			withCredentials: true,
		})

		source.addEventListener('message', (e: MessageEvent) => {
			let payload = JSON.parse(e.data)
			let text = payload.content
			if (text !== null && text !== '\n') {
				resultRef.current = (resultRef.current || '') + text
				setResult(resultRef.current)
			}

			if (payload.finish_reason) {
				try {
					saveMessage({
						id,
						content: resultRef.current,
						role: 'assistant',
					}).unwrap()
				} catch (error) {
					console.error('Error sending message:', error)
				}
				source.close()
			}
		})

		source.addEventListener('readystatechange', (e: any) => {
			if (e.readyState >= 2) {
				setIsLoading(false)
			}
		})

		source.stream()
	}

	return (
		<>
			<div
				className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5`}
			>
				<div
					className={`relative flex items-center ${
						isSender ? 'flex-row-reverse' : ''
					}`}
				>
					{isSender ? (
						<div className='flex flex-col'>
							<Image
								src='/no-avatar.png'
								alt='Avatar'
								className='rounded-full'
								width={50}
								height={50}
							/>
						</div>
					) : (
						<Image
							src='/no-avatar.png'
							alt='Avatar'
							className='rounded-full'
							width={50}
							height={50}
						/>
					)}

					<div className={isSender ? 'mr-3' : 'ml-3'}>
						<div
							className={`text-sm text-white py-1.5 mt-4 px-3 rounded-2xl ${
								isSender
									? 'rounded-tr-none bg-primary'
									: 'rounded-tl-none bg-grey'
							}`}
						>
							<ReactMarkdown>{message.content}</ReactMarkdown>
						</div>
						<div
							className={`text-xs opacity-30 block mt-1.5 ${
								isSender ? 'text-right' : 'text-left'
							}`}
						>
							{dayjs(message.createdAt).format('HH:mm')}
						</div>
					</div>
				</div>
			</div>
			{isLoading && <ExtraComponent streamResponse={result} />}
		</>
	)
}

const ExtraComponent = ({ streamResponse }: { streamResponse: any }) => {
	return (
		<div className={'flex justify-start mb-2.5'}>
			<div className={'relative flex items-center'}>
				<Image
					src='/no-avatar.png'
					alt='Avatar'
					className='rounded-full'
					width={50}
					height={50}
				/>
				<div className='ml-3'>
					<div className='text-sm text-white py-1.5 mt-4 px-3 rounded-2xl rounded-tl-none bg-grey'>
						<ReactMarkdown>{streamResponse}</ReactMarkdown>
					</div>
				</div>
			</div>
		</div>
	)
}
