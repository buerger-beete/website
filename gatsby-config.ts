import { config } from "dotenv"
import { GatsbyConfig } from "gatsby"

config({ path: ".env" })


const gatsbyConfig: GatsbyConfig = {
	siteMetadata: {
		title: "Bürger:Beete – Bürger:innen begrünen den Potsdamer Bassinplatz",
		description: "Bürger:Beete. Wir verbinden engagierte Potsdamer mit der Begrünung von Brachflächen in der Stadt.",
		author: "@coderwelsch",
		city: "Potsdam"
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sass",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "files",
				path: `${ __dirname }/src/content`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: `${__dirname}/src/images`,
			},
		},
		"gatsby-transformer-remark",
		"gatsby-transformer-sharp",
		"gatsby-plugin-image",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "gatsby-starter-default",
				short_name: "starter",
				start_url: "/",
				background_color: "#05A054",
				theme_color: "#05A054",
				display: "minimal-ui",
				icon: "src/assets/logos/buerger-beete-favicon.svg",
			},
		},
		{
			resolve: "gatsby-plugin-matomo",
			options: {
				siteId: "2",
				matomoUrl: "https://matomo.go-n-grow.org",
				siteUrl: "https://buerger-beete.de",
			},
		},
		"gatsby-plugin-provide-react",
		"gatsby-plugin-offline",
	],
}

export default gatsbyConfig
