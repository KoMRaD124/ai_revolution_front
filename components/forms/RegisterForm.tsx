'use client'

import { Form } from '@/components/forms'
import { useRegister } from '@/hooks'

export default function RegisterForm() {
	const {
		username,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	} = useRegister()

	const config = [
		{
			labelText: 'Введите адрес электронной почты',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},
		{
			labelText: 'Придумайте пароль',
			labelId: 'password',
			type: 'password',
			value: password,
			link: {
				linkText: 'ㅤ',
				linkUrl: '',
			},
			required: true,
		},
	]

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Зарегистрироваться'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	)
}
