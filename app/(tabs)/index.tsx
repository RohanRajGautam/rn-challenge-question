import { View } from 'react-native'
import ChallengeQuestion from '@/components/ChallengeQuestion'

interface Item {
	id: number
	name: string
}

const data: Item[] = [
	{ id: 1, name: 'Rohan' },
	{ id: 2, name: 'Raj' },
	{ id: 3, name: 'Gautam' },
]

export default function HomeScreen() {
	return (
		<View style={{ flex: 1 }}>
			<ChallengeQuestion data={data} />
		</View>
	)
}
