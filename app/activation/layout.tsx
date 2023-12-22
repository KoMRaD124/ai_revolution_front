import { FormsScreensLayout } from '@/components/screens/authForms'

interface Props {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
	return <FormsScreensLayout>{children}</FormsScreensLayout>
}
