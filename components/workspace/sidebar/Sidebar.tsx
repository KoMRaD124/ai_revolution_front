'use client'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'

import { CurrentUser } from '..'
import { MENU } from './sidebar.data'

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className={styles.sidebar}>
			<Image
				src='/mini_logo.svg'
				priority
				width={75}
				height={75}
				alt='logo'
				className='pt-4'
			/>
			<div>
				{MENU.map((item) => (
					<Link
						href={item.url}
						key={item.url}
						className={cn({
							[styles.active]: pathname === item.url,
						})}
					>
						<item.icon size={27} />
					</Link>
				))}
			</div>
			<div>
				<CurrentUser />
			</div>
		</aside>
	)
}
