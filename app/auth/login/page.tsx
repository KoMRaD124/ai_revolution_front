import {
	FormsScreensLayout,
	LoginFormPage,
} from '@/components/screens/authForms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'CreaCraft | Вход',
	description: 'CreaCraft login page',
}

export default function Page() {
	return (
		<FormsScreensLayout>
			<LoginFormPage />
		</FormsScreensLayout>
	)
}
