/**
 * Select element in DOM HTML
 * @param {*} element - The css selector of the HTML element to target
 * @returns {HTMLElement}
 */
export const $ = (element: string): HTMLElement => {
	const node = <HTMLElement>document.querySelector(`${element}`)
	return node
}

/**
 * Select Multiple elements in dom
 * @param selector The element class selector
 * @returns Node[]
 */
export const $All = (selector: string): Node[] => {
	const nodeList: NodeList = document.querySelectorAll(`${selector}`)
	return [...nodeList]
}
/**
 * Define custom element
 * @param name - Custom element name to use in HTML (eg: button-toggle)
 * @param classElement - The class that implement this component
 */
export function defineCustomElement<CustomElementConstructor extends globalThis.CustomElementConstructor>(
	name: string,
	classElement: CustomElementConstructor
): void {
	customElements.define(name, classElement)
}

/**
 * Get Attribute of Element
 * @param {HTMLElement} element - HTML element
 * @param {HTMLElement} name - Name of attribute (ex : data-animation)
 * @returns {string}
 */
export const $Attribute = (element: HTMLElement, name: string) => {
	return element.getAttribute(name)
}

/**
 * Récupère le cookie donc le nom est passé en paramère
 * @param {string} name - le nom ou la clé du cookie à récupérer
 * @returns {string} la valeur du cookie ou NULL si le cookies n'éxiste pas
 */
export function getCookie(name: string): string | null {
	let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))
	return matches ? decodeURIComponent(matches[1]) : null
}

export function deleteCookie(name: string, path: string) {
	if (getCookie(name)) {
		document.cookie = name + "=" + "" + (path ? ";path=" + path : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
	}
}

export function CSSclassHandler(selector: string, className: string, toggle: boolean) {
	const element = $(selector)

	if (toggle === true) {
		if (element.classList.contains(className)) return
		element.classList.add(className)
	} else {
		element.classList.remove(className)
	}
}

//https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
/**
 * Observe et execuse un callback lorsque les noeuds enfants(DOM) de la cible ont été modifier
 * @param {HTMLElement} node - Le noeud DOM à observé
 * @param {Function} callback - la fonction à éxécuter lorsque le DOM de la cible à changé
 * @param {selector} selector
 */
export function ObserveNodeDomChange(node: HTMLElement, cb: CallableFunction, selector: string) {
	// Select the node that will be observed for mutations
	const targetNode = document.querySelector(`.${node}`)

	// Options for the observer (which mutations to observe)
	const config = { childList: true, subtree: true }

	//Callback function to execute when mutations are observed
	const callback = (mutationsList: MutationRecord[]) => {
		// Use traditional 'for loops' for IE 11
		mutationsList.forEach((mutation: MutationRecord) => {
			if (mutation.type === "childList") {
				cb(selector)
			} else if (mutation.type === "attributes") {
				cb(selector)
			}
		})
	}

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback)

	// Start observing the target node for configured mutations
	targetNode ? observer.observe(targetNode, config) : void 0
	//observer.observe(targetNode, config);

	// Later, you can stop observing
	//observer.disconnect();
}

/**
 * Insert Element in DOM
 * @param elements HTMLelement to insert in target
 * @param targetSelector Target
 * @returns
 */
export function InsertElementsToDom(elements: HTMLElement[] | HTMLElement, targetSelector: string | HTMLElement) {
	let target: HTMLElement

	if (typeof targetSelector === "string") {
		target = $(targetSelector)

		if (elements instanceof HTMLElement) {
			target.appendChild(elements)
			return
		}
		elements.forEach((element: HTMLElement) => target.appendChild(element))
	} else {
		if (elements instanceof HTMLElement) {
			targetSelector.appendChild(elements)
			return
		}
		elements.forEach((element: HTMLElement) => targetSelector.appendChild(element))
	}
}

/**
 * Extract element html string to HTML ELEMENT
 * @param data The html string data
 * @param selector The element in HTML to extract
 * @returns HTMLelement
 */
export function ExtractHtmlELementFromString(data: string, selector: string): HTMLElement {
	const container = createHTMLelement("div")
	container.innerHTML = data
	const wrapper = <HTMLElement>container.querySelector(`${selector}`)
	return wrapper
}

/**
 * Set attribute name and number to childs element of HTMLelement
 * @param elements The html element
 * @param attributeName Attribute name
 * @param increment Determine the incremetn use index of array or increment by a specific number
 */
export function setAttributeToChildrens(elements: HTMLElement[], attributeName: string, increment: number | boolean): void {
	elements.forEach((element: HTMLElement, index: number) => {
		if (typeof increment === "number") {
			const i: number = index + increment
			element.setAttribute(attributeName, i.toString())
		} else if (!increment) {
			element.setAttribute(attributeName, index.toString())
		}
	})
}

/**
 * convert FileList to Array
 * @param fileList  The Filelist element
 * @returns Array of files
 */
export function convertFileListToArray(fileList: FileList | null): File[] {
	const files: File[] = []

	if (fileList) {
		for (let file of fileList) {
			files.push(file)
		}
	}

	return files
}

/**
 * Adds a set of className to an array of HTML elements
 * @param elements The html element
 * @param classList List of CSS class
 */
export function setClassNameToChildrens(elements: HTMLElement[], classList: string[]): void {
	elements.forEach((element: HTMLElement) => {
		classList.forEach((className: string) => {
			element.classList.add(className)
		})
	})
}

/**
 * Create HTML element with properties
 * @param name - HTML element name to create
 * @param id - Element ID attribues
 * @param classList - and array of className attributes to set on element
 * @param attributes - Other attributes (eg: href)
 * @returns HTMLElement
 */
export function createHTMLelement<T extends HTMLElement>(
	name: string,
	id?: string,
	classList?: string[],
	attributes?: { name: string; value: string }[]
): T {
	const element = <T>document.createElement(name)

	if (id) {
		element.id = id
	}

	if (classList) {
		classList.forEach((c: string) => {
			element.classList.add(c)
		})
	}

	if (attributes) {
		attributes.forEach((a: { name: string; value: string }) => {
			element.setAttribute(a.name, a.value)
		})
	}

	return element
}

/**
 * This function splits text from innerHTML based on regex. Then, it wrap sparated words with <span> except <br>
 * Finally, it returns array of span
 * @param {HTML element} element
 * @param {string} split This is separator for text (regex)
 * @return {Array.<HTML element>} Array of span html element
 */
export default function splitTextOnElement(element: HTMLElement, split: string) {
	var words = splitText(element.innerHTML.toString(), split)
	var str = ""
	words.forEach(function (line) {
		if (line.indexOf("<br>") > -1) {
			var lines = line.split("<br>")
			lines.forEach(function (line, id) {
				str += id > 0 ? "<br>" + parseLine(line) : parseLine(line)
			})
		} else {
			str += parseLine(line)
		}
	})
	element.innerHTML = str
	return element.querySelectorAll("span")
}

/**
 * This function split text into array including <br>
 * @params {string} txt This is text that retrieved from html element
 * @params {string} split It is separator for text (regex)
 * @return {Array.<string>} result of split using separator including <br>
 */
function splitText(txt: string, split: string) {
	var splits = txt.split("<br>")
	var arr: string[] = []
	splits.forEach(function (item, id) {
		if (id > 0) arr.push("<br>")
		arr = arr.concat(item.split(split))
	})
	return arr
}
/**
 * This function will wrap passed argument with <span> if passed argument is not empty, space, or <br>
 * @params {string} line It is words that are separated by seprator
 * @return {string} it is either '', ' ', <br> , or <span>line<span>
 */
function parseLine(line: string): string {
	if (line === "" || line === " ") {
		return line
	} else {
		return line === "<br>" ? "<br>" : "<span>" + line + "</span>" + (line.length > 1 ? " " : "")
	}
}
