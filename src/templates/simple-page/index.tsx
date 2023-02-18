import React from "react"
import { Columns, Content, Section } from "react-bulma-components"

import Layout from "../../components/base/layout/Layout"
import Seo from "../../components/base/seo/Seo"


interface SimplePageProps {
	pageContext: {
		html: string,
		frontmatter: {
			title: string
			path: string,
			meta: {
				name: string,
				content: string | number
			}
		}
	}
}


const SimplePage = ({ pageContext }: SimplePageProps) => {
	return (
		<Layout>

			<Seo title={ pageContext.frontmatter.title } />

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
