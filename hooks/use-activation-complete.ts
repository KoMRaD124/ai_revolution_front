import { useResendActivationMutation } from '@/redux/features/authApiSlice'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

export default function useActivationComplete(initialEmail = '') {
	const [resendVerify, { isLoading }] = useResendActivationMutation()

	const [email, setEmail] = useState(initialEmail)

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			await resendVerify({ email })
			toast.success(
				'Запрос отправлен, проверьте свою почту для получения ссылки'
			)
		} catch (error) {
			toast.error('Что-то пошло не так')
		}
	}

	return {
		email,
		isLoading,
		onChange,
		onSubmit,
	}
}
