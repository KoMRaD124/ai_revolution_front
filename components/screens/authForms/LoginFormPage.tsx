import { SocialButtons } from '@/components/common'
import { LoginForm } from '@/components/forms'
import Link from 'next/link'
import styles from "./styles.module.scss"
export default function LoginFormPage() {

	return (
		<div className={styles.loginFormContainer}>
			<div className='flex min-h-full flex-1 flex-col justify-center mx-14'>

				<h2 className='mt-9 text-left text-3xl font-semibold leading-9 tracking-tight text-textlight' style={{textAlign:"center"}}>
					Вход
				</h2>
			</div>

			<div className='mt-3 mx-auto'>
				<LoginForm />
				<SocialButtons />

				<p className='my-6 text-center text-sm text-textlight'>
					Нет аккаунта?{'   '}
					<Link
						href='/auth/registration'
						className=' text-textlight hover:text-texthover'
					>
						Зарегистрироваться
					</Link>
				</p>
			</div>
		</div>
	)
}
