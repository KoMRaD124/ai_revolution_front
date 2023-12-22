'use client'

import { Form } from '@/components/forms'
import { useResetPassword } from '@/hooks'

export default function PasswordResetForm() {
	const { email, isLoading, onChange, onSubmit } = useResetPassword()

	const config = [
		{
			labelText: 'Адрес электронной почты',
			labelId: 'email',
			type: 'email',
			onChange,
			value: email,
			required: true,
		},
	]

	const isButtonActive = email.trim() !== '' && !isLoading

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Сбросить пароль'
			onChange={onChange}
			onSubmit={onSubmit}
			isButtonActive={isButtonActive}
		/>
	)
}
