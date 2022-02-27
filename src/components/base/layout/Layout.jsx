import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Navigation from "../../ui/molecule/navigation/Navigation"
import Footer from "../../ui/molecule/footer/Footer"


const Layout = ({
	children,
	type,
}) => {
	return (
		<>
			<Navigation type={ type } />

			{ children }

			<Footer />
		</>
	)
}

export default Layout
