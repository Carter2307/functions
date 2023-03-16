/**
 * Verifie si un fichier est un document
 * @param file le fichier à verfier
 * @param type  le type à verifier
 * @returns Renvois true si le fichier est du même type
 */
export const validFileType = (file: File, type: string) => {
	const documents: string[] = [
		"application/pdf",
		"application/doc",
		"application/docx",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/msword",
	]
	let bool = false

	const images: string[] = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/bmp"]

	if (type === "documents") {
		for (let i = 0; i < documents.length; i++) {
			if (file.type === documents[i]) {
				return (bool = true)
			}
		}
	} else if (type === "images") {
		for (let i = 0; i < images.length; i++) {
			if (file.type === images[i]) {
				return (bool = true)
			}
		}
	} else {
		return bool
	}
}

/**
 * Verify if file size respect the limit
 * @param file The file object
 * @param limit file size limit in Mb(Megabytes)
 * @returns
 */
export const validFileSize = (file: File, limit: number) => {
	const sizeInByte = file.size
	let sizeInMegaByte = sizeInByte / 1000000

	return limit >= sizeInMegaByte
}

/**
 * Verifie si un email est valide
 * @param email
 * @returns {boolean}
 */

export function validEmail(email: string) {
	const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

	if (regex.test(email)) {
		return true
	}
}
