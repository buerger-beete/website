export function getContrast (hexColor: string) {
	// If a leading # is provided, remove it
	if (hexColor.slice(0, 1) === "#") {
		hexColor = hexColor.slice(1)
	}

	// Convert to RGB value
	const r = parseInt(hexColor.substr(0, 2), 16)
	const g = parseInt(hexColor.substr(2, 2), 16)
	const b = parseInt(hexColor.substr(4, 2), 16)

	// Get YIQ ratio
	const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

	// Check contrast
	return (yiq >= 128) ? "black" : "white"

}

export function hslToHex (hsl: string) {
	const ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i

	if (ex.test(hsl)) {
		const sep = hsl.indexOf(",") > -1 ? "," : " "
		const _hsl = hsl.substr(4).split(")")[0].split(sep)

		let h: any = _hsl[0]

		// @ts-ignore
		const s = _hsl[1].substr(0, _hsl[1].length - 1) / 100

		// @ts-ignore
		const l = _hsl[2].substr(0, _hsl[2].length - 1) / 100

		// strip label and convert to degrees (if necessary)
		if (h.indexOf("deg") > -1) {
			h = h.substr(0, h.length - 3)
		} else if (h.indexOf("rad") > -1) {
			h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI))
		} else if (h.indexOf("turn") > -1) {
			h = Math.round(h.substr(0, h.length - 4) * 360)

		}

		if (h >= 360) {
			h %= 360
		}

		const c = (1 - Math.abs(2 * l - 1)) * s
		const x = c * (1 - Math.abs((h / 60) % 2 - 1))

		const m = l - c / 2

		let r: string | number = 0,
			g: string | number = 0,
			b: string | number = 0

		if (0 <= h && h < 60) {
			r = c
			g = x
			b = 0
		} else if (60 <= h && h < 120) {
			r = x
			g = c
			b = 0
		} else if (120 <= h && h < 180) {
			r = 0
			g = c
			b = x
		} else if (180 <= h && h < 240) {
			r = 0
			g = x
			b = c
		} else if (240 <= h && h < 300) {
			r = x
			g = 0
			b = c
		} else if (300 <= h && h < 360) {
			r = c
			g = 0
			b = x
		}

		// having obtained RGB, convert channels to hex
		r = Math.round((r + m) * 255).toString(16)
		g = Math.round((g + m) * 255).toString(16)
		b = Math.round((b + m) * 255).toString(16)

		// prepend 0s if necessary
		if (r.length === 1) {
			r = "0" + r
		}
		if (g.length === 1) {
			g = "0" + g
		}
		if (b.length === 1) {
			b = "0" + b
		}

		return "#" + r + g + b

	} else {
		return "Invalid input color"
	}
}