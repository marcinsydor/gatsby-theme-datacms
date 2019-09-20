module.exports = themeOptions => {
  const datacms = themeOptions.datocms || {};
  datacms.apiToken = themeOptions.datacms.apiToken || "";
  datacms.previewMode = themeOptions.datacms.previewMode || false;

  return {
    __experimentalThemes: [`gatsby-theme-ui`],
    plugins: [
      `gatsby-plugin-react-helmet`,
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
      `gatsby-plugin-mdx`,
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
      `gatsby-plugin-recaptcha`,
      `gatsby-plugin-sharp`,
      `gatsby-background-image`,
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `website`,
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
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          // CommonMark mode (default: true)
          commonmark: true,
          // Footnotes mode (default: true)
          footnotes: true,
          // Pedantic mode (default: true)
          pedantic: true,
          // GitHub Flavored Markdown mode (default: true)
          gfm: true,
          // Plugins configs
          plugins: []
        }
      },
      {
        resolve: `gatsby-plugin-layout`,
        options: {
          component: require.resolve(`./src/components/layout.js`)
        }
      }
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.app/offline
      // 'gatsby-plugin-offline',
    ]
  };
};
