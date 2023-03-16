/**
 * Vérifie si une Url pointe vers une page valide
 *
 * @async
 * @param {string} url - le lien de la page
 * @returns {boolean} Boolean
 */
export async function UrlExist(url: string) {
	const options: RequestInit = {
		mode: "no-cors",
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	}
	const response = await fetch(url, options)
	return response.status !== 404
}
