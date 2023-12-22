import { Navbar } from '@/components/common'
import { TransitionEffect } from '@/components/utils'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import styles from "./styles.module.scss"

interface LayoutProps {
	children: ReactNode
	className?: string
}

const FormsScreensLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<main
			className={styles.formScreenContainer}
		>

			<section className={styles.formScreenForm}>
				<div className={styles.formScreenFormContainer}>
					<div>{children}</div>
				</div>

			</section>
		</main>
	)
}

export default FormsScreensLayout
