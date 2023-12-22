import cn from 'classnames'

interface Props {
	provider: 'google' | 'vk' | 'github'
	children: React.ReactNode
	[rest: string]: any
}

export default function SocialButton({ provider, children, ...rest }: Props) {
	const className = cn(
		'h-10 px-5 py-3.5 rounded-3xl border border-button justify-center items-center gap-2.5 flex text-buttonactive hover:bg-buttonhover hover:border-buttonhover hover:bg-opacity-20 hover:text-textlight'
	)

	return (
		<button className={className} {...rest}>
			<span className='flex justify-start items-center'>{children}</span>
		</button>
	)
}
