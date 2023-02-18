import { ImageDataLike } from "gatsby-plugin-image"
import React, { ReactNode } from "react"

import AwesomeSlider from "react-awesome-slider"
import withAutoplay from "react-awesome-slider/dist/autoplay"
import "react-awesome-slider/dist/styles.css"
import { cn } from "reusable-components/dist/helper"

import Image from "../../../atom/image/Image"
import * as Styles from "../Header.module.scss"


const AutoplaySlider = withAutoplay(AwesomeSlider)


interface SlideshowProps {
	organicArrows?: boolean,
	mediaFiles: Array<ImageDataLike & {
		author: string,
		id: string,
		relativePath: string,
	}>,
	children?: ReactNode,
	className?: string,
	contentClassName?: string,
}


const Slideshow = ({
	organicArrows = false,
	mediaFiles = [],
	children,
	className,
	contentClassName,
}: SlideshowProps) => {
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
				{ mediaFiles.map((file) => {
					return (
						<div
							key={ file.id }
							className={ Styles.slide }
						>
							{ file.author &&
								<p className={ Styles.author }>© Foto/Beet von { file.author }</p>
							}

							<Image
								data={ file }
								alt={ `© Foto/Beet von ${ file.author }` }
							/>
						</div>
					)
				}) }
			</AutoplaySlider>
		</div>
	)
}

export default Slideshow