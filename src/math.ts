export const lerp = (start: number, end: number, amount: number): number => {
	return (1 - amount) * start + amount * end
}

export const clamp = (value: number, min: number, max: number): number => {
	return Math.min(Math.max(value, min), max)
}
