import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";

const Header = props => (
  <header className={styles.root}>
    <Link className={styles.logo} to="/">
      {props.siteTitle}
    </Link>

    <div
      className={styles.contactContent}
      dangerouslySetInnerHTML={{ __html: props.headerContent }}
    />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
