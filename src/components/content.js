import { MDXProvider } from "@mdx-js/react";
import cn from "classnames";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Button } from "gatsby-theme-ui";
import React from "react";
import styles from "./content.module.scss";

const shortcodes = { Link, Button };

const Content = ({ children }) => (
  <div className={cn(styles.host)}>
    {typeof children === "string" ? (
      <MDXProvider components={shortcodes}>
        {children ? (
          <MDXRenderer>{children}</MDXRenderer>
        ) : (
          <div>Syntax error</div>
        )}
      </MDXProvider>
    ) : (
      children
    )}
  </div>
);

export default Content;
