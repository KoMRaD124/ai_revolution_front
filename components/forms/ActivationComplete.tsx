'use client'

import { Form } from '@/components/forms'
import { useActivationComplete } from '@/hooks'
import { useSearchParams } from 'next/navigation'

export default function ActivationCompleteForm() {
	const searchParams = useSearchParams()
	const initialEmail = String(searchParams.get('email'))
	const { email, isLoading, onChange, onSubmit } =
		useActivationComplete(initialEmail)

	interface Config {
		labelText: string
		labelId: string
		type: string
		value: string
		link?: {
			linkText: string
			linkUrl: string
		}
		required?: boolean
	}

	const config: Config[] = []

	const isButtonActive = email.trim() !== '' && !isLoading

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Отправить повторно'
			onChange={onChange}
			onSubmit={onSubmit}
			isButtonActive={isButtonActive}
		/>
	)
}
