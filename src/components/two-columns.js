import { MDXProvider } from "@mdx-js/react";
import cn from "classnames";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Button } from "gatsby-theme-ui";
import React from "react";
import styles from "./two-columns.module.scss";

const shortcodes = { Link, Button };

const TwoColumns = ({ data }) => (
  <div className={cn(styles.host)}>
    <div className={cn(styles.column)}>
      <h2>{data.title1}</h2>
      <MDXProvider components={shortcodes}>
        {data.content1Node.childMdx ? (
          <MDXRenderer>{data.content1Node.childMdx.body}</MDXRenderer>
        ) : (
          <div>Syntax error</div>
        )}
      </MDXProvider>
    </div>
    <div className={cn(styles.column)}>
      <h2>{data.title2}</h2>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{data.content2Node.childMdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
  </div>
);
export default TwoColumns;
