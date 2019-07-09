import { graphql, Link, useStaticQuery } from "gatsby";
import { AppBar, Menu } from "gatsby-theme-ui";
import PropTypes from "prop-types";
import React from "react";
import "../styles/global.scss";
import Footer from "./footer";
import styles from "./layout.module.scss";
import "./layout.scss";

const Layout = props => {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site: datoCmsSite {
        name
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
      <AppBar headerContent={data.header.content} mainMenu={data.mainMenu}>
        <Link className={styles.logo} to="/">
          {data.site.name}
        </Link>

        <div
          className={styles.contactContent}
          dangerouslySetInnerHTML={{ __html: data.header.content }}
        />

        <Menu links={data.mainMenu.links} />
      </AppBar>
      <main>{children}</main>
      <Footer siteTitle={data.site.name} footerContent={data.site.name} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
