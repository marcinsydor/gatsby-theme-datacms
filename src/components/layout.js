import { graphql, Link, useStaticQuery } from "gatsby";
import { AppBar, Menu } from "gatsby-theme-ui";
import PropTypes from "prop-types";
import React from "react";
import "../styles/global.scss";
import Footer from "./footer";
import styles from "./layout.module.scss";

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
        contentNode {
          childMarkdownRemark {
            html
          }
        }
      }
      footer: datoCmsWidget(slug: { eq: "footer" }) {
        title
        slug
        contentNode {
          childMarkdownRemark {
            html
          }
        }
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
    <div className={styles.host}>
      <AppBar headerContent={data.header.content} mainMenu={data.mainMenu}>
        <Link className={styles.logo} to="/">
          {data.site.name}
        </Link>

        <div
          className={styles.headerWidget}
          dangerouslySetInnerHTML={{
            __html: data.header.contentNode.childMarkdownRemark.html
          }}
        />

        <Menu links={data.mainMenu.links} />
      </AppBar>
      <main className={styles.main}>{children}</main>
      <Footer>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} {data.site.name}
        </div>
        <div
          className={styles.footerWidget}
          dangerouslySetInnerHTML={{
            __html: data.footer.contentNode.childMarkdownRemark.html
          }}
        />
      </Footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
