'use client'

import { Spinner } from '@/components/common'
import { FormsScreensLayout } from '@/components/screens/authForms'
import { useSocialAuth } from '@/hooks'
import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice'

export default function Page() {
	const [googleAuthenticate] = useSocialAuthenticateMutation()
	useSocialAuth(googleAuthenticate, 'google-oauth2')

	return (
		<FormsScreensLayout>
			<div className='my-8'>
				<Spinner lg />
			</div>
		</FormsScreensLayout>
	)
}
