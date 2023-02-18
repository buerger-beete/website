import React, { ReactNode } from "react"
import { Button, Columns, Heading } from "react-bulma-components"

import PATCH_FLOWERED_ICON_SRC from "../../../../assets/icons/patch-flowered.svg"
import ICONS from "../../../../constants/Icons"
import InfoTile from "../../../ui/molecule/info-tile/InfoTile"
import Interferer from "../../../ui/molecule/interferer/Interferer"

import * as Styles from "./Join.module.scss"


interface TileProps {
	title: string,
	icon: keyof typeof ICONS,
	primary?: boolean,
	children: ReactNode
}


const Tile = ({
	title,
	icon,
	primary,
	children,
}: TileProps) =>
	<InfoTile
		title={ title }
		icon={ icon }
		primary={ primary }
		tablet={ {
			size: 4,
		} }
		desktop={ {
			size: 3,
		} }
	>
		{ children }
	</InfoTile>

const Join = () => {
	return (
		<Interferer
			id={ "join" }
			backgroundColor={ "primary-light" }
			hasTransitionTop
			hasTransitionBottom
			fullSize
		>

			<Columns
				centered
				vCentered
				className={ Styles.columns }
			>

				<Columns.Column
					className={ Styles.description }
					tablet={ {
						size: 8,
					} }
					desktop={ {
						size: 6,
					} }
				>

					<img
						src={ PATCH_FLOWERED_ICON_SRC }
						alt={ "Icon: Blumenbeet" }
						className={ Styles.icon }
					/>

					<Heading
						size={ 1 }
						textAlign={ "centered" }
					>
						In 4 Schritten zum <br />
						eigenem Beet
					</Heading>
				</Columns.Column>

			</Columns>

			<Columns
				className={ Styles.columns }
				multiline
				centered
			>

				<Tile
					title={ "1. Samen & Areal" }
					icon={ "seed-bag" }
				>
					<p>
						Spreche mit uns über E-Mail deine Wunschareal ab. Wir treffen uns nach Absprache gemeinsam mit
						dem <i>Bereich&nbsp;Grünflächen</i> an deinem Wunsch&shy;areal und besprechen mit dir die
						indi&shy;vidu&shy;ellen Pflege&shy;tipps deiner Baum&shy;scheibe / Wiese / deinem&nbsp;Beet.
					</p>

					<Button.Group
						align={ "center" }
					>
						<Button
							renderAs={ "a" }
							target={ "_blank" }
							href={ "/files/pdf/Baumscheiben-Pflegetipps-BUND.pdf" }
							style={ { paddingRight: "2.25rem" } }
							color={ "dark" }
						>
							💡&nbsp;&nbsp;Baumscheiben Pflegetipps (PDF)
						</Button>
					</Button.Group>
				</Tile>

				<Tile
					title={ "2. Pflegevereinbarung" }
					icon={ "contract" }
				>
					<p>
						Unterschreibe die von uns zugeschickte Verein&shy;barung. Keine Sorge, du kannst diese binnen 30
						Tagen kündigen, wenn du es dir anders überlegst. Hier ist ein Beispiel hinterlegt:
					</p>

					<Button.Group
						align={ "center" }
					>
						<Button
							renderAs={ "a" }
							target={ "_blank" }
							href={ "/files/pdf/Pflegevereinbarung-Muster.pdf" }
							style={ { paddingRight: "2.25rem" } }
							color={ "dark" }
						>
							🔖&nbsp;&nbsp;Mustervertrag (PDF)
						</Button>
					</Button.Group>
				</Tile>

				<Tile
					title={ "3. Beet Aufbereitung" }
					icon={ "potsdam" }
				>
					<p>
						Der <i>Bereich Grünflächen</i> bereitet dein gewähltes Areal auf und baut nach Bedarf
						Begrenzung für dich (z.B. Beeteinfassungen). Erde kann meist binnen 2 Tagen auf deiner Fläche
						aufgebracht werden.
					</p>
				</Tile>

				<Tile
					title={ "4. Säe und Staune!" }
					icon={ "sow" }
					primary
				>
					<p>
						Im <strong>März / April</strong> ist die beste Zeit, dein Beet bzw. deine
						Wiese zu bepflanzen 🌻. Wenn du dich über die Saison mit uns und anderen Bürger:&shy;Beetler:&shy;innen austauschen
						möchtest, solltest du am besten unserer <a href={ "#join-us" }>E-Mail-Gruppe</a> beitreten ☺️.
					</p>
				</Tile>
			</Columns>

		</Interferer>
	)
}

export default Join