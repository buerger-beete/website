import { GatsbyImage, GatsbyImageProps, getImage, ImageDataLike } from "gatsby-plugin-image"
import React from "react"


interface ImageProps extends Omit<GatsbyImageProps, "image"> {
	data: ImageDataLike
}


const Image = ({ data, alt, ...props }: ImageProps) => {
	return (
		<GatsbyImage
			alt={ alt || "" }
			image={ getImage(data)! }
			{ ...props }
		/>
	)
}

export default Image
