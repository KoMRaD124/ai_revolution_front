import {
	FormsScreensLayout,
	ResetFormPage,
} from '@/components/screens/authForms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'AI Revolution | Password Reset',
	description: 'AI Revolution password reset page',
}

export default function Page() {
	return (
		<FormsScreensLayout>
			<ResetFormPage />
		</FormsScreensLayout>
	)
}
