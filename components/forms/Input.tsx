'use client'

import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { EyeClose, EyeOpen } from '../common/Icons'

interface Props {
	labelId: string
	type: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	value: string
	children: React.ReactNode
	link?: {
		linkText: string
		linkUrl: string
	}
	required?: boolean
	onValidationChange: (isValid: boolean) => void
}

export default function Input({
	labelId,
	type,
	onChange,
	value,
	children,
	link,
	required = false,
	onValidationChange,
}: Props) {
	const [isHovered, setIsHovered] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const [isValidEmail, setIsValidEmail] = useState(true)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [isEyeHovered, setIsEyeHovered] = useState(false)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement

			if (!target.closest(`#${labelId}`)) {
				validateEmail()
				setIsHovered(false)
				setIsClicked(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)

		return () => {
			document.body.removeEventListener('click', handleClickOutside)
		}
	}, [labelId, value])

	const isInputFilled = value.trim() !== ''

	const validateEmail = () => {
		if (type.toLowerCase() === 'password') {
			setIsValidEmail(true)
			onValidationChange(true)
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const isValid = emailRegex.test(value)
		setIsValidEmail(isValid)

		if (!isValid) {
			setIsClicked(false)
			onValidationChange(false)
		} else {
			onValidationChange(true)
		}
	}

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	return (
		<div>
			<div
				className={`relative my-8 text-textlight border-b border-textlight border-opacity-50 ${
					isHovered || isClicked ? 'hovered' : ''
				}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => {
					setIsClicked(!isClicked)
				}}
				style={{
					borderColor:
						isValidEmail ||
						value.trim() === '' ||
						(isClicked && document.activeElement?.id === labelId)
							? '#4A7AFF'
							: '#F72E25',
				}}
			>
				<label
					htmlFor={labelId}
					className={`absolute left-1 text-sm leading-6 font-normal pointer-events-none transition-transform ${
						isClicked ? 'transform-translate' : ''
					}`}
					style={{
						color:
							(isHovered ||
								isClicked ||
								(typeof document !== 'undefined' &&
									document.activeElement?.id === labelId &&
									!isInputFilled)) &&
							!isEyeHovered
								? 'rgba(246, 246, 246, 0.7)'
								: 'rgba(246, 246, 246, 0.4)',
						fontSize: isClicked || isInputFilled ? '12px' : 'inherit',
						width:"275px",
						transform: isClicked
							? 'translateY(-20px)'
							: isInputFilled
							? 'translateY(-20px)'
							: 'translateY(12px)',
						
					}}
				>
					{children}
				</label>
				<input
					id={labelId}
					className={`bg-transparent text-sm leading-6 font-normal border-none outline-none focus:ring-0 ${
						!isValidEmail ? 'border-red-500' : ''
					}`}
					name={labelId}
					type={
						type.toLowerCase() === 'password'
							? isPasswordVisible
								? 'text'
								: 'password'
							: type
					}
					onChange={(e) => {
						onChange(e)
					}}
					value={value}
					required={required}
				/>
				{type.toLowerCase() === 'password' && (
					<button
						type='button'
						className='absolute right-1.5 top-1/2 transform -translate-y-1/2 cursor-pointer '
						onClick={togglePasswordVisibility}
						onMouseEnter={() => setIsEyeHovered(true)}
						onMouseLeave={() => setIsEyeHovered(false)}
						style={{
							backgroundColor: isEyeHovered ? '#3F4657' : '',
							borderRadius: '50%',
							width: '25px',
							height: '25px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginLeft: '20px',
						}}
					>
						{isPasswordVisible ? (
							<EyeOpen className='text-textlight text-opacity-100' />
						) : (
							<EyeClose className='text-textlight text-opacity-40' />
						)}
					</button>
				)}
			</div>
			{link && (
				<div className='text-sm'>
					<Link
						className='font-normal text-textlight hover:text-texthover'
						href={link.linkUrl}
					>
						{link.linkText}
					</Link>
				</div>
			)}
			<style jsx>{`
				.hovered label {
					color: rgba(246, 246, 246, 0.7);
				}
				.transform-translate {
					transition: transform 0.2s ease-in-out;
				}
				.eye-icon {
					width: 25px;
					height: 25px;
				}
			`}</style>
		</div>
	)
}
