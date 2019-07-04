import React from "react";
import styles from "./footer.module.scss";

const Footer = props => {
  return (
    <footer className={styles.host}>
      <span>© {new Date().getFullYear()} {props.siteTitle}</span>
      <span
        className={styles.contactContent}
        dangerouslySetInnerHTML={{ __html: props.footerContent }}
      />
    </footer>
  );
};

export default Footer;
