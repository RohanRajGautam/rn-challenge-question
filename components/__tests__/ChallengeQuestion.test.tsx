import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import ChallengeQuestion from '../ChallengeQuestion'

const mockData = [
	{ id: 1, name: 'Rohan' },
	{ id: 2, name: 'Raj' },
	{ id: 3, name: 'Gautam' },
]

describe('ChallengeQuestion Component', () => {
	it('renders the component correctly', () => {
		const { getByPlaceholderText, getByText } = render(
			<ChallengeQuestion data={mockData} />
		)

		expect(getByPlaceholderText('Search...')).toBeTruthy()
		mockData.forEach((item) => {
			expect(getByText(item.name)).toBeTruthy()
			expect(getByText('Not selected')).toBeTruthy()
		})
	})

	it('filters the list based on search input', async () => {
		const { getByPlaceholderText, getByText, queryByText } = render(
			<ChallengeQuestion data={mockData} />
		)
		const searchInput = getByPlaceholderText('Search...')

		fireEvent.changeText(searchInput, 'Rohan')

		await waitFor(() => {
			expect(getByText('Rohan')).toBeTruthy()
			expect(queryByText('Raj')).toBeNull()
			expect(queryByText('Gautam')).toBeNull()
		})
	})

	it('clears the search input and resets the list', async () => {
		const { getByPlaceholderText, getByText, queryByText } = render(
			<ChallengeQuestion data={mockData} />
		)
		const searchInput = getByPlaceholderText('Search...')
		const clearButton = getByText('Clear')

		fireEvent.changeText(searchInput, 'Rohan')
		await waitFor(() => {
			expect(getByText('Rohan')).toBeTruthy()
			expect(queryByText('Raj')).toBeNull()
			expect(queryByText('Gautam')).toBeNull()
		})

		fireEvent.press(clearButton)

		await waitFor(() => {
			mockData.forEach((item) => {
				expect(getByText(item.name)).toBeTruthy()
			})
		})
	})

	it('toggles item selection state', () => {
		const { getByText } = render(<ChallengeQuestion data={mockData} />)

		const firstItem = mockData[0]
		const firstItemName = getByText(firstItem.name)
		const firstItemStatus = getByText('Not selected')

		fireEvent.press(firstItemName)

		expect(firstItemStatus.props.style.color).toBe('green')
		expect(firstItemStatus.props.children).toBe('Selected')

		fireEvent.press(firstItemName)

		expect(firstItemStatus.props.style.color).toBe('red')
		expect(firstItemStatus.props.children).toBe('Not selected')
	})
})

//? Explanation of the Tests
// Renders the Component Correctly:
// This test ensures that the component renders with the search input and the list of items, each displaying their names and initial selection status.

// Filters the List Based on Search Input:
// This test verifies that typing in the search input correctly filters the list of items based on the search term.

// Clears the Search Input and Resets the List:
// This test checks that pressing the clear button resets the search input and displays the full list of items.

// Toggles Item Selection State:
// This test ensures that tapping an item toggles its selection state correctly.
