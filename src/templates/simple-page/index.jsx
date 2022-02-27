import React from "react"
import { Columns, Section, Content } from "react-bulma-components"

import Layout from "../../components/base/layout/Layout"
import SEO from "../../components/base/seo/SEO"


const SimplePage = ({ pageContext }) => {
	return (
		<Layout>

			<SEO title={ pageContext.frontmatter.title } />

			<Section style={ { marginTop: "9rem" } }>
				<Columns centered>
					<Columns.Column size={ 6 }>
						<Content
							dangerouslySetInnerHTML={ { __html: pageContext.html } }
						/>
					</Columns.Column>
				</Columns>
			</Section>

		</Layout>
	)
}

export default SimplePage
