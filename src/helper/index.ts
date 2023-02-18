import body from "./body"


function getMailLink () {
	const subject = "👋 Ahoi! – Warteliste Bürger:Beete"

	return `mailto:info@buerger-beete.de?subject=${ encodeURIComponent(subject) }&body=${ encodeURIComponent(body) }`
}

function findPolygonCenter (points: Array<{ lat: number, lng: number }>) {
	const xs = points.map(p => p.lat)
	const ys = points.map(p => p.lng)

	const lat = (Math.min(...xs) + Math.max(...xs)) / 2
	const lng = (Math.min(...ys) + Math.max(...ys)) / 2

	return {
		lat,
		lng,
	}
}

function shuffleArray (arr: Array<any>) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[ arr[i], arr[j] ] = [ arr[j], arr[i] ]
	}

	return arr
}

export {
	shuffleArray,
	getMailLink,
	findPolygonCenter,
}