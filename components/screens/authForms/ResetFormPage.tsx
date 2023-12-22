import { PasswordResetForm } from '@/components/forms'
import Link from 'next/link'
import styles from "./styles.module.scss"
export default function ResetFormPage() {
	return (
		<div className={styles.loginFormContainer}>
		<div className='flex min-h-full flex-1 flex-col justify-center mx-14'>

			<h2 className='mt-9 text-left text-3xl font-semibold leading-9 tracking-tight text-textlight' style={{textAlign:"center"}}>
					Востановление
				</h2>
			</div>

			<div className='mt-3 mx-auto'>
				<PasswordResetForm />
				<p className='my-6 text-center text-sm text-textlight'>
					<Link
						href='/auth/login'
						className=' text-textlight hover:text-texthover'
					>
						Отмена
					</Link>
				</p>
			</div>
		</div>
	)
}
