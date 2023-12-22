import { ActivationCompleteForm } from '@/components/forms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'AI Revolution | Activation complete',
	description: 'AI Revolution activation complete page',
}

export default function Page() {
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img
					className='mx-auto h-10 w-auto'
					src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
					alt='AI Revolution'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Подтверждение регистрации
				</h2>
			</div>

			<div className='mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10'>
				<div className='flex gap-3 rounded-md border border-indigo-600 bg-indigo-50 p-4'>
					<h3 className='text-sm font-medium text-indigo-800 text-center'>
						Осталось совсем чуть-чуть...
						<br /> Проверьте свою почту, мы отправили вам ссылку на активацию
						аккаунта.
					</h3>
				</div>
				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<ActivationCompleteForm />
				</div>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'></div>
		</div>
	)
}
