import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Image = ({ data, ...props }) => {
	return (
		<GatsbyImage
			alt={ "" }
			image={ getImage(data) }
			{ ...props }
		/>
	)
}

export default Image
