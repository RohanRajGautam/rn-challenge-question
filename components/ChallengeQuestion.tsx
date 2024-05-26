import { debounce } from '@/utils/function'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	View,
	TextInput,
	TouchableOpacity,
	FlatList,
	Text,
	StyleSheet,
} from 'react-native'

interface Item {
	id: number
	name: string
}

interface ChallengeQuestionProps {
	data: Item[]
}

const ChallengeQuestion: React.FC<ChallengeQuestionProps> = ({ data }) => {
	const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
	const [searchTerm, setSearchTerm] = useState<string>('')
	const inputRef = useRef<TextInput>(null)

	// Memoize the filtered data based on search term
	const dataSource = useMemo(() => {
		return data.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [data, searchTerm])

	// Handle item selection and deselection
	const handleSelect = useCallback((item: Item) => {
		setSelectedItems((currentSelectedItems) => {
			const newSelectedItems = new Set(currentSelectedItems)
			if (newSelectedItems.has(item.id)) {
				newSelectedItems.delete(item.id)
			} else {
				newSelectedItems.add(item.id)
			}
			return newSelectedItems
		})
	}, [])

	// Clear the search input and reset the search term
	const handleClear = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.clear()
		}
		setSearchTerm('')
	}, [])

	// Debounced version of setSearchTerm
	const debouncedSetSearchTerm = useMemo(() => debounce(setSearchTerm, 300), [])

	useEffect(() => {
		return () => {
			// Cleanup the debounce on unmount
			debouncedSetSearchTerm.cancel && debouncedSetSearchTerm.cancel()
		}
	}, [debouncedSetSearchTerm])

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					ref={inputRef}
					onChangeText={setSearchTerm}
					value={searchTerm}
					style={styles.input}
					placeholder='Search...'
				/>
				<TouchableOpacity onPress={handleClear} style={styles.clearButton}>
					<Text>Clear</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={dataSource}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => handleSelect(item)}
						style={styles.itemContainer}
					>
						<Text>{item.name}</Text>
						<Text
							style={{
								color: selectedItems.has(item.id) ? 'green' : 'red',
							}}
						>
							{selectedItems.has(item.id) ? 'Selected' : 'Not selected'}
						</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 100,
		paddingHorizontal: 16,
	},
	searchContainer: {
		flexDirection: 'row',
		marginBottom: 12,
	},
	input: {
		borderColor: 'gray',
		width: '80%',
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		marginBottom: 12,
	},
	clearButton: {
		padding: 12,
	},
	listContent: {
		gap: 10,
	},
	itemContainer: {
		marginBottom: 4,
	},
})

export default ChallengeQuestion
