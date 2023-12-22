import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-open)'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			colors: {
				bgcolor: '#1e314c',
				bgform: '#2F3442',

				basepunk: '#F72585',
				baseyellow: '#FFEE70',
				baseviolet: '#7209B7',

				textlight: '#F6F6F6',
				texthover: '#4A7AFF',

				button: '#4A7AFF',
				buttonhover: '#668FFF',
				buttonactive: '#878890',

				bgchatlist: '#15171E',
				bgchatmessage: '#2F3442',

				basecolor: '#001324',
				basecyan: '#58E6D9',
				basepink: '#f5088f',
				basegrey: '#202121',
				baseorange: '#EE881F',
				dark: '#00040E',

				grey: '#7c7275',
				greyblue: '#2E2D8C',
				darkgrey: '#bababa',

				light: '#f5f5f5',
				primaryDark: '#58E6D9',

				primary: '#EE881F',
			},
		},
		screens: {
			'2xl': { 'max': '1439px' },
			// => @media (max-width: 1440px) { ... }

			'xl': { 'max': '1279px' },
			// => @media (max-width: 1279px) { ... }

			'lg': { 'max': '1023px' },
			// => @media (max-width: 1023px) { ... }

			'md': { 'max': '767px' },
			// => @media (max-width: 767px) { ... }

			'sm': { 'max': '639px' },
			// => @media (max-width: 639px) { ... }

			'xs': { 'max': '479px' },
			// => @media (max-width: 479px) { ... }
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
export default config
