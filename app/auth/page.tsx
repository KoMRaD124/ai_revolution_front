import {
    FormsScreensLayout,
    LoginFormPage,
} from '@/components/screens/authForms'
import type { Metadata } from 'next'
import styles from "./styles.module.scss"
import logo from "../../public/CREACRAFT.svg"
import text from "../../public/text.png"
import Image from 'next/image'
import Link from 'next/link'
import { Chat } from '@/components/screens/conversations'

export const metadata: Metadata = {
    title: 'DeepLine',
    description: 'DeepLine',
}

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}> <Image src={logo} alt="DEEPLINE" /></div>
                <div className={styles.loginBlock}>
                    <div className={styles.text}> <Image src={text} alt="DEEPLINE" /> </div>
                    <div className={styles.buttons}>
                        <Link href={"/auth/login"} className={styles.button}>Войти</Link>
                        <Link href={"/auth/registration"} className={styles.button}>Зарегистрироваться</Link>
                    </div>
                </div>
            </div>
           
        </div>
    )
}
