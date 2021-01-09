import React from "react"

import Columns from "react-bulma-components/lib/components/columns/columns";
import Column from "react-bulma-components/lib/components/columns/components/column";
import Section from "react-bulma-components/lib/components/section/section";
import Content from "react-bulma-components/lib/components/content/content";

import Layout from "../../components/base/layout/Layout"
import SEO from "../../components/base/seo/SEO"


const SimplePage = ({ pageContext }) => {
	return (
		<Layout>

			<SEO title="Impressum" />

			<Section style={ { marginTop: "9rem" } }>
				<Columns centered>
					<Column size={ 6 }>
						<Content
							dangerouslySetInnerHTML={ { __html: pageContext.html  } }
						/>
					</Column>
				</Columns>
			</Section>

		</Layout>
	)
}

export default SimplePage
