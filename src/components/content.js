import { MDXProvider } from "@mdx-js/react";
import cn from "classnames";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Button } from "gatsby-theme-ui";
import React from "react";
import styles from "./content.module.scss";

const shortcodes = { Link, Button };

const Content = props => (
  <div className={cn(styles.host)}>
    <MDXProvider components={shortcodes}>
      {props.data.contentNode.childMdx ? (
        <MDXRenderer>{props.data.contentNode.childMdx.body}</MDXRenderer>
      ) : (
        <div>Syntax error</div>
      )}
    </MDXProvider>
  </div>
);

export default Content;
