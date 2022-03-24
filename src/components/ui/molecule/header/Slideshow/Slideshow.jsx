import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

// awesome styles
import AwesomeSlider from "react-awesome-slider"
import withAutoplay from "react-awesome-slider/dist/autoplay"
import "react-awesome-slider/dist/styles.css"
import { cn } from "reusable-components/dist/helper"
import Image from "../../../atom/image/Image"

import * as Styles from "../Header.module.scss"


const AutoplaySlider = withAutoplay(AwesomeSlider)

const Slideshow = ({
	organicArrows = false,
	mediaFiles = [],
	children,
	className,
	contentClassName,
	...props
}) => {
	return (
		<div className={ Styles.root }>
			{ children &&
				<div className={ cn(Styles.overlay, contentClassName) }>
					{ children }
				</div>
			}

			<AutoplaySlider
				play={ true }
				bullets={ false }
				organicArrows={ organicArrows }
				cancelOnInteraction={ false } // should stop playing on user interaction
				interval={ 5500 }
				loop={ true }
				className={ cn(
					Styles.slideshow,
					className,
				) }
			>
				{ mediaFiles.map((file, index) => {
					return (
						<div
							key={ file.id }
							className={ Styles.slide }
						>
							{ file.author &&
								<p className={ Styles.author }>© Foto/Beet von { file.author }</p>
							}
							<Image data={ file } />
						</div>
					)
				}) }
			</AutoplaySlider>
		</div>
	)
}

export default Slideshow