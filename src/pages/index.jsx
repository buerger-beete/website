import React from "react"

import Layout from "../components/base/layout/Layout"
import Map from "../components/base/sections/map/Map";
import SEO from "../components/base/seo/SEO"
import Header from "../components/ui/molecule/header/Header";

import About from "../components/base/sections/about/About";
import Join from "../components/base/sections/join/Join";
import Contact from "../components/base/sections/contact/Contact";


const IndexPage = () => {
    return (
        <Layout>

            <SEO title="Willkommen" />
            <Header />

            <About />
            <Join />
            <Map />
            <Contact />

        </Layout>
    )
}

export default IndexPage
