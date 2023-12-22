import { ChatsList } from '@/components/screens/conversations'
import { type PropsWithChildren } from 'react'
import styles from "./style.module.scss"
export default function ChatLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div
			className='h-full w-full bg-bgchatlist bg-opacity-90'
			style={{
				display: 'flex',

				backgroundColor: "#2F3441"
			}}
		>
			<div className=''
				style={{ width: "320px", backgroundColor: "#15171E" }}>
				<ChatsList />
			</div>
			<div style={{
				width:"100%",
				display: 'flex',
				justifyContent:"center"
			}}>
				{children}</div>
		</div>
	)
}
