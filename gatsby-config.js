module.exports = {
    siteMetadata: {
        title: `Bürger:Beete – Bürger:innen begrünen den Potsdamer Bassinplatz`,
        description: `Bürger:Beete. Wir verbinden engagierte Potsdamer mit der Begrünung von Brachflächen in der Stadt.`,
        author: `@coderwelsch`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `files`,
                path: `${__dirname}/src/`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/assets/logos/buerger-beete-favicon.svg`,
            },
        },
        // `gatsby-plugin-offline`,
    ],
}
