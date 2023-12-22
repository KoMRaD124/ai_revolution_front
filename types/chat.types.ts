import { UUID } from 'crypto'

export interface IStreamResponse {
	role: string
	content: string
	finish_reason: string
}

export interface IMessage {
	id: UUID
	conversation: UUID
	content: string
	role: string
	createdAt: string
}

export interface IChat {
	id: UUID
	title: string
	model: string
	prompt: string
	maxTokens: number
	temperature: number
	topP: number
	frequencyPenalty: number
	presencePenalty: number
	createdAt: string
	updatedAt: string
	messages: IMessage[]
}

export interface IChatConfig {
	id: UUID
	title: string
	model: string
	prompt: string
	maxTokens: number
	temperature: number
	topP: number
	frequencyPenalty: number
	presencePenalty: number
}

export interface IChatsList {
	id: UUID
	title: string
	createdAt: string
	updatedAt: string
}