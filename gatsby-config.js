module.exports = themeOptions => {
  const siteMetadata = themeOptions.siteMetadata || {};
  siteMetadata.title = siteMetadata.title || `Website Title`;
  siteMetadata.description = siteMetadata.description || `Website Description`;
  siteMetadata.siteUrl = siteMetadata.siteUrl || "https://twigcity.com";

  const datacms = themeOptions.datocms || {};
  datacms.apiToken = themeOptions.datacms.apiToken || "";
  datacms.previewMode = themeOptions.datacms.previewMode || false;

  return {
    siteMetadata: {
      author: `info@twigcity.com`,
      ...siteMetadata
    },
    plugins: [
      `gatsby-theme-ui`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src`
        }
      },
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          cssLoaderOptions: {
            camelCase: true
          }
        }
      },
      {
        resolve: "gatsby-plugin-react-svg",
        options: {
          rule: {
            include: /assets/
          }
        }
      },

      {
        resolve: `gatsby-source-datocms`,
        options: {
          // You can find your read-only API token under the Settings > API tokens
          // section of your administrative area:
          apiToken: datacms.apiToken,

          // If you are working on development/staging environment, you might want to
          // preview the latest version of records instead of the published one:
          previewMode: datacms.previewMode,

          // Disable automatic reloading of content when some change occurs on DatoCMS:
          disableLiveReload: false,

          // Custom API base URL
          apiUrl: "https://site-api.datocms.com",

          // Setup locale fallbacks
          // In this example, if some field value is missing in Italian, fall back to English
          localeFallbacks: {
            it: ["en"]
          }
        }
      },

      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `magmar-construction`,
          short_name: `website`,
          start_url: `/`,
          background_color: `#367DBA`,
          theme_color: `#367DBA`,
          display: `minimal-ui`,
          icon: require.resolve(`./src/images/icon.png`) // This path is relative to the root of the site.
        }
      },
      {
        resolve: `gatsby-plugin-sitemap`
      },
      {
        resolve: "gatsby-plugin-robots-txt",
        options: {
          policy: [{ userAgent: "*", allow: "/" }]
        }
      }
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.app/offline
      // 'gatsby-plugin-offline',
    ]
  };
};
