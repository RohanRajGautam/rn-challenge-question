import React, { useEffect, useRef, useState } from 'react'
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
	const [selectedItems, setSelectedItems] = useState<Item[]>([])
	const [dataSource, setDataSource] = useState<Item[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const inputRef = useRef<TextInput>(null)

	useEffect(() => {
		setDataSource(data)
	}, [data])

	useEffect(() => {
		const filteredData = data.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setDataSource(filteredData)
	}, [searchTerm, data])

	/**
	 * The `handleSelect` function toggles the selection of an item in a list of selected items.
	 * @param {Item} item - The `item` parameter in the `handleSelect` function represents an object of
	 * type `Item`. This function is used to handle the selection of items in a list.
	 */
	const handleSelect = (item: Item) => {
		setSelectedItems((currentSelectedItems) => {
			if (currentSelectedItems.some((selected) => selected.id === item.id)) {
				return currentSelectedItems.filter(
					(selected) => selected.id !== item.id
				)
			}
			return [...currentSelectedItems, item]
		})
	}

	const handleClear = () => {
		if (inputRef.current) {
			inputRef.current.clear()
		}
		setSearchTerm('')
		setDataSource(data)
	}

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
								color: selectedItems.some((selected) => selected.id === item.id)
									? 'green'
									: 'red',
							}}
						>
							{selectedItems.some((selected) => selected.id === item.id)
								? 'Selected'
								: 'Not selected'}
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
