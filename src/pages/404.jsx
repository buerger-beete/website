import React from "react"

import Layout from "../components/base/layout/Layout"
import SEO from "../components/base/seo/SEO"


const NotFoundPage = () => (
	<Layout>
		<SEO title="404: Seite nicht gefunden" />
		<h1>404: Seite nicht gefunden</h1>
		<p>
			Hmmm … irgendwas ist schief gelaufen.
			<br/><br/>
			<a href="/">Zur Startseite zurück</a>
		</p>
	</Layout>
)

export default NotFoundPage
