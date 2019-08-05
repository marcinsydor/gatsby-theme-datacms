import cn from "classnames";
import React from "react";
import styles from "./two-columns.module.scss";

const TwoColumns = ({ data }) => (
  <div className={cn(styles.host)}>
    <div className={cn(styles.column)}>
      <h2>{data.title1}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: data.content1Node.childMarkdownRemark.html
        }}
      />
    </div>
    <div className={cn(styles.column)}>
    <h2>{data.title2}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: data.content2Node.childMarkdownRemark.html
        }}
      />
    </div>
  </div>
);
export default TwoColumns;
