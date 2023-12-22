'use client'

import { useLogoutMutation } from '@/redux/features/authApiSlice'
import { logout as setLogout } from '@/redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CustomLink from './CustomLink'

export default function Navbar() {
	const dispatch = useAppDispatch()

	const [logout] = useLogoutMutation()

	const { isAuthenticated } = useAppSelector((state) => state.auth)
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(!isOpen)
	}

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout())
			})
	}

	const authLinks = (isMobile: boolean) => (
		<>
			<CustomLink
				href='/conversations'
				title='Рабочее пространство'
				className={isMobile ? '' : 'mr-8'}
			/>
			<CustomLink
				title='Выход'
				onClick={handleLogout}
				className={isMobile ? '' : 'ml-10'}
			/>
		</>
	)

	const guestLinks = (isMobile: boolean) => (
		<>
			<CustomLink
				href='/auth/login'
				title='Войти'
				className={isMobile ? '' : 'mr-8'}
			/>
			<CustomLink
				href='/auth/registration'
				title='Зарегистрироваться'
				className={isMobile ? '' : 'ml-10'}
			/>
		</>
	)

	return (
		<nav
			className='absolute top-0 left-0 w-full px-24 py-8 font-medium flex items-center justify-between z-10 lg:px-16 md:px-12 sm:px-8
	'
		>
			<button
				className='flex flex-col justify-center items-center hidden lg:flex'
				onClick={handleClick}
			>
				<span
					className={`bg-basecyan block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm 
			${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
				></span>
				<span
					className={`bg-basecyan block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5
			 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
				></span>
				<span
					className={`bg-basecyan block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm
			 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
				></span>
			</button>

			<div className='w-full flex justify-between items-center lg:hidden'>
				<Link href='/'>
					<Image src='/CREACRAFT.svg' alt='logo' width={134} height={30} />
				</Link>
				<nav className='flex items-center justify-center flex-wrap'>
					{isAuthenticated ? authLinks(false) : guestLinks(false)}
				</nav>
			</div>

			{isOpen ? (
				<motion.div
					initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
					animate={{ scale: 1, opacity: 1 }}
					className='min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-basegrey rounded-lg backdrop-blur-md py-32
            '
				>
					<nav className='flex items-center flex-col justify-center'>
						{isAuthenticated ? authLinks(true) : guestLinks(true)}
					</nav>
				</motion.div>
			) : null}
		</nav>
	)
}
