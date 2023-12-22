import { apiSlice } from '../services/apiSlice'

interface User {
	username: string
	first_name: string
	last_name: string
	email: string
	gpt3_tokens: number
	gpt4_tokens: number
}

interface UpdateUserArgs {
	username?: string
	first_name?: string
	last_name?: string
}

interface SocialAuthArgs {
	provider: string
	state: string
	code: string
}

interface CreateUserResponse {
	success: boolean
	user: User
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/users/me/',
		}),
		updateUser: builder.mutation<User, UpdateUserArgs>({
			query: (args) => ({
				url: '/users/me/',
				method: 'PATCH',
				body: args,
			}),
		}),
		socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
			query: ({ provider, state, code }) => ({
				url: `/users/o/${provider}/?state=${encodeURIComponent(
					state
				)}&code=${encodeURIComponent(code)}`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/users/jwt/create/',
				method: 'POST',
				body: { email, password },
			}),
		}),
		register: builder.mutation({
			query: ({ username, email, password, re_password }) => ({
				url: '/users/',
				method: 'POST',
				body: { username, email, password, re_password },
			}),
		}),
		verify: builder.mutation({
			query: () => ({
				url: '/users/jwt/verify/',
				method: 'POST',
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/users/jwt/logout/',
				method: 'POST',
			}),
		}),
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),
		resendActivation: builder.mutation({
			query: ({ email }) => ({
				url: '/users/resend_activation/',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPassword: builder.mutation({
			query: (email) => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),
	}),
})

export const {
	useRetrieveUserQuery,
	useUpdateUserMutation,
	useSocialAuthenticateMutation,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResendActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice
