import { Chat } from '@/components/screens/conversations'
import { UUID } from 'crypto'

export default function ChatPage({ params }: { params: { id: UUID } }) {
	return <Chat id={params.id} />
}
