import {
	FormsScreensLayout,
	LoginFormPage,
} from '@/components/screens/authForms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'DeepLine | Вход',
	description: 'DeepLine login page',
}

export default function Page() {
	return (
		<FormsScreensLayout>
			<LoginFormPage />
		</FormsScreensLayout>
	)
}
