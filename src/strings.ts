export const stringsNotEmpty = (strings : string[]):string[] => {
	return strings.filter(string => string !== "")
}
