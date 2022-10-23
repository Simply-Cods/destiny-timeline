import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Destiny Timeline`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    // "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: 'tracedSVG',
          backgroundColor: 'transparent',
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        "path": `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          'material icons',
          'Lato\:400,700'
        ],
      },
    },
  ],
};

export default config;
