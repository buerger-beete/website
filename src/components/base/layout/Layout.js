import React from "react"
import PropTypes from "prop-types"
import {useStaticQuery, graphql} from "gatsby"

import Navigation from "../../ui/molecule/navigation/Navigation"
import Footer from "../../ui/molecule/footer/Footer";


const Layout = ({children}) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <>
            <Navigation
                siteTitle={data.site.siteMetadata?.title || `Title`}
            />

            { children }

            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
