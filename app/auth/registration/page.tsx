import { FormsScreensLayout, RegFormPage } from '@/components/screens/authForms'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'DeepLine | Регистрация',
	description: 'Сreate your account on DeepLine',
}

export default function Page() {
	return (
		<FormsScreensLayout>
			<RegFormPage />
		</FormsScreensLayout>
	)
}
