import { FormsScreensLayout, RegFormPage } from '@/components/screens/authForms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'CreaCraft | Регистрация',
	description: 'Сreate your account on CreaCraft',
}

export default function Page() {
	return (
		<FormsScreensLayout>
			<RegFormPage />
		</FormsScreensLayout>
	)
}
