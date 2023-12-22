import { Setup } from '@/components/utils'
import Provider from '@/redux/provider'
import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: 'CreaCraft',
	description: 'AI Revolution application',
}

export const viewport: Viewport = {
	themeColor: '#1e314c',
	colorScheme: 'dark',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<body className={`${inter.variable}`}>
				<Provider>
					<Setup />
					{children}
				</Provider>
			</body>
		</html>
	)
}
