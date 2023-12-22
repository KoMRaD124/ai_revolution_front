'use client'

import { SocialButton } from '@/components/common'
import { continueWithGithub, continueWithGoogle, continueWithVK } from '@/utils'
import { GitHub, Google, VKontakte } from './Icons'

export default function SocialButtons() {
	return (
		<div className='justify-center items-center gap-3 flex pt-4'>
			<SocialButton provider='google' onClick={continueWithGoogle}>
				<Google className='' />
			</SocialButton>
			<SocialButton provider='vk' onClick={continueWithVK}>
				<VKontakte className='' />
			</SocialButton>
			<SocialButton provider='github' onClick={continueWithGithub}>
				<GitHub className='' />
			</SocialButton>
		</div>
	)
}
