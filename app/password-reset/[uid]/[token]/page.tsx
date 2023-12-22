import { PasswordResetConfirmForm } from '@/components/forms'
import { FormsScreensLayout } from '@/components/screens/authForms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'AI Revolution | Password Reset Confirm',
	description: 'AI Revolution password reset confirm page',
}

interface Props {
	params: {
		uid: string
		token: string
	}
}

export default function Page({ params: { uid, token } }: Props) {
	return (
		<FormsScreensLayout>
			<div className='flex min-h-full flex-1 flex-col justify-center mx-14'>
				<div className=''>
					<h2 className='mt-9 text-left text-3xl font-semibold leading-9 tracking-tight text-textlight'>
						Новый пароль
					</h2>
				</div>

				<div className='mt-3 mx-auto py-6'>
					<PasswordResetConfirmForm uid={uid} token={token} />
				</div>
			</div>
		</FormsScreensLayout>
	)
}
