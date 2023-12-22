'use client'

import { Form } from '@/components/forms'
import { useResetPasswordConfirm } from '@/hooks'

interface Props {
	uid: string
	token: string
}

export default function PasswordResetConfirmForm({ uid, token }: Props) {
	const { new_password, isLoading, onChange, onSubmit } =
		useResetPasswordConfirm(uid, token)

	const config = [
		{
			labelText: 'Пароль',
			labelId: 'new_password',
			type: 'password',
			onChange,
			value: new_password,
			required: true,
		},
	]

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Задать пароль'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	)
}
