import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import "../styles/global.scss";
import Footer from "./footer";
import Header from "./header";
import "./layout.scss";

const Layout = props => {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
      header: datoCmsWidget(slug: { eq: "header" }) {
        title
        slug
        content
      }
      footer: datoCmsWidget(slug: { eq: "footer" }) {
        title
        slug
        content
      }
      mainMenu: datoCmsMenu(slug: { eq: "main" }) {
        links {
          ... on DatoCmsPage {
            slug
            title
          }
        }
      }
      footerMenu: datoCmsMenu(slug: { eq: "footer" }) {
        links {
          ... on DatoCmsPage {
            slug
            title
          }
        }
      }
    }
  `);

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        headerContent={data.header.content}
        mainMenu={data.mainMenu}
      />
      <main>{children}</main>
      <Footer
        siteTitle={data.site.siteMetadata.title}
        footerContent={data.footer.content}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
