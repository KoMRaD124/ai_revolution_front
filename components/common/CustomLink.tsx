import Link from 'next/link'
import { FC } from 'react'

interface CustomLinkProps {
	href?: string
	title: string
	className?: string
	[rest: string]: any
}

const CustomLink: FC<CustomLinkProps> = ({
	href,
	title,
	className = '',
	...rest
}) => {
	if (!href) {
		return (
			<div className={`${className} relative group text-textlight`}>
				<span role='button' onClick={rest.onClick}>
					{title}
				</span>
				<span
					className='h-[1px] inline-block bg-textlight absolute left-0 -bottom-0.5 
          group-hover:w-full transition-[width] ease duration-300  
          w-0'
				>
					&nbsp;
				</span>
			</div>
		)
	}
	return (
		<Link href={href} className={`${className} relative group text-textlight`}>
			{title}

			<span
				className='h-[1px] inline-block bg-textlight absolute left-0 -bottom-0.5 
          group-hover:w-full transition-[width] ease duration-300  
          w-0'
			>
				&nbsp;
			</span>
		</Link>
	)
}

export default CustomLink
