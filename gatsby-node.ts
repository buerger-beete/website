import { GatsbyNode } from "gatsby"
import * as path from "path"
import blogPages from "./gatsby-nodes/blog-page"
import simplePages from "./gatsby-nodes/simple-page"


export const createPages: GatsbyNode["createPages"] = async (props) => {
	await simplePages(props)
	await blogPages(props)
}

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src")
			}
		}
	});
};