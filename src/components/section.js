import cn from "classnames";
import React from "react";
import styles from "./section.module.scss";

const Section = props => {
  const {
    children,
    className,
    type,
    backgroundColor,
    backgroundImage,
    height
  } = props;

  return (
    <section
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        minHeight: height
      }}
      className={cn(styles.host, styles[type], className)}
    >
      {/* <div className={styles.container}> */}
      {children}
      {/* </div> */}
    </section>
  );
};

export default Section;
