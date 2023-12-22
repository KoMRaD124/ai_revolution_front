import { LucideIcon } from 'lucide-react'

interface Button {
	label: string
	icon: LucideIcon
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface ButtonGroupProps {
	buttons: Button[]
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {
	return (
		<div>
			{buttons.map((button) => (
				<button
					className='p-1 rounded bg-transparent text-textlight text-opacity-40 hover:text-basepunk hover:text-opacity-100'
					onClick={button.onClick}
					key={button.label}
				>
					<button.icon size={16} />
				</button>
			))}
		</div>
	)
}

export default ButtonGroup
