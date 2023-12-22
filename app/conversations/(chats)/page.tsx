import {
	Book,
	Chat,
	Close,
	EyeClose,
	EyeOpen,
	GitHub,
	Google,
	LogOut,
	PauseCircle,
	Plus,
	Send,
	VKontakte,
	XCircle,
} from '@/components/common/Icons'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'DeepLine | Умный помощник для эффективной работы',
	description: 'DeepLine | ChatGPT assistant',
}

export default function Page() {
	return (
		<div className='flex flex-col h-full w-full justify-center items-center text-center px-56 bg-bgchatmessage'>
			<h1 className='text-3xl font-bold text-texthover'>Приветствую!</h1>
			<p className='leading-normal text-muted-foreground py-10'>
				Готова преобразить твои идеи в виртуальные истории. <br />
				Давай начнем прямо сейчас!
			</p>
			{/* <div className='flex justify-center items-center'>
				<GitHub className='mr-2' />
				<VKontakte className='mr-2' />
				<Google className='mr-2' />
				<EyeOpen className='mr-2' />
				<EyeClose className='mr-2' />
				<Book className='mr-2' />
				<XCircle className='mr-2' />
				<PauseCircle className='mr-2' />
				<Chat className='mr-2' />
				<LogOut className='mr-2' />
				<Plus className='mr-2' />
				<Send className='mr-2' />
				<Close className='mr-2' />
			</div> */}
		</div>
	)
}
