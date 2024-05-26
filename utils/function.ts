/**
 * The `debounce` function in TypeScript allows you to delay the execution of a function until a
 * specified time has passed without it being called again.
 * @param func - The `func` parameter is a function that you want to debounce. It can take any number
 * of arguments and does not return any value.
 * @param {number} delay - The `delay` parameter in the `debounce` function represents the time in
 * milliseconds for which the execution of the `func` function will be delayed. This delay ensures that
 * the `func` function is not called multiple times within a short period, but only after the specified
 * delay has passed without any
 * @returns The `debounce` function is being returned, which is a higher-order function that takes a
 * function `func` and a delay `number` as arguments. It creates a debounced version of the input
 * function `func` that will only be called after the specified delay has passed without any new
 * invocations. The debounced function also has a `cancel` method that can be used to cancel the
 */
export const debounce = (func: (...args: any[]) => void, delay: number) => {
	let timeoutId: NodeJS.Timeout | null = null
	const debouncedFunction = (...args: any[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			func(...args)
		}, delay)
	}
	debouncedFunction.cancel = () => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
	}
	return debouncedFunction as typeof debouncedFunction & { cancel: () => void }
}
