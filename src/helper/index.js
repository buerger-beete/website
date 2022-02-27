import body from "./body.js"


function getMailLink() {
	const subject = "👋 Ahoi! – Anmeldung Bürger:Beete"

	return `mailto:info@buerger-beete.de?subject=${ encodeURIComponent(subject) }&body=${ encodeURIComponent(body) }`
}

function findPolygonCenter(points) {
	const xs = points.map(p => p.lat)
	const ys = points.map(p => p.lng)

	const lat = ( Math.min(...xs) + Math.max(...xs) ) / 2
	const lng = ( Math.min(...ys) + Math.max(...ys) ) / 2

	return {
		lat,
		lng,
	}
}

export {
	getMailLink,
	findPolygonCenter,
}