'use client'

import { Loader } from '@/components/screens/conversations'
import { useAppSelector } from '@/redux/hooks'
import { redirect } from 'next/navigation'
import styles from './RequireAuth.module.css'

interface Props {
	children: React.ReactNode
}

export default function RequireAuth({ children }: Props) {
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth)

	if (isLoading) {
		return (
			<div
				className={`grid justify-center items-center h-screen ${styles.loader}`}
			>
				<Loader />
			</div>
		)
	}

	if (!isAuthenticated) {
		redirect('/auth/login')
	}

	return <>{children}</>
}
