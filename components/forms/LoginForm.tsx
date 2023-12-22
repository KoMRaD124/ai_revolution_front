'use client'

import { Form } from '@/components/forms'
import { useLogin } from '@/hooks'

export default function LoginForm() {
	const { email, password, isLoading, onChange, onSubmit } = useLogin()

	const config = [
		{
			labelText: 'Адрес электронной почты',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},
		{
			labelText: 'Пароль',
			labelId: 'password',
			type: 'password',
			value: password,
			link: {
				linkText: 'Востановить пароль',
				linkUrl: '/password-reset',
			},
			required: true,
		},
	]

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Войти'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	)
}
