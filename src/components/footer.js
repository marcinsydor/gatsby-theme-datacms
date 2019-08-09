import React from "react";
import styles from "./footer.module.scss";

const Footer = props => (
  <footer className={styles.host}>{props.children}</footer>
);

export default Footer;
