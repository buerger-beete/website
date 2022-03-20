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

function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr
}

export {
	shuffleArray,
	getMailLink,
	findPolygonCenter,
}