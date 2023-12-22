'use client'
import { useLogoutMutation } from '@/redux/features/authApiSlice'
import { logout as setLogout } from '@/redux/features/authSlice'
import { useAppDispatch } from '@/redux/hooks'
import { LogOut } from 'lucide-react'

export default function CurrentUser() {
	const dispatch = useAppDispatch()
	const [logout] = useLogoutMutation()

	const handleLogout = () => {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout())
			})
	}

	return (
		<button
			onClick={handleLogout}
			className='text-[#7C7275] hover:text-white transition-colors ease-linear pb-4'
		>
			<LogOut size={27} />
		</button>
	)
}
