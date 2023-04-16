import React from "react"

import Layout from "@/components/base/layout/Layout"
import Seo from "@/components/base/seo/Seo"


const NotFoundPage = () => (
	<Layout>
		<Seo title={ "404: Seite nicht gefunden" } />
		<h1>404: Seite nicht gefunden</h1>
		<p>
			Hmmm … irgendwas ist schief gelaufen.
			<br /><br />
			<a href={ "/#" }>Zur Startseite zurück</a>
		</p>
	</Layout>
)

export default NotFoundPage
