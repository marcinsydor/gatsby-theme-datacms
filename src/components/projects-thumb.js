import { Link } from "gatsby";
import React from "react";
import styles from "./projects-thumb.module.scss";

const ProjectsThumb = props => {
  const { title, url, image } = props;

  return (
    <li className={styles.host}>
      <Link className={styles.link} to={url}>
        {/* <Img fluid={image.placeholderImage.childImageSharp.fluid} /> */}
        <div className={styles.title}>{title}</div>

        {image ? (
          <img
            className={styles.image}
            alt={title}
            src={image}
          />
        ) : (
          "No image"
        )}
      </Link>
    </li>
  );
};

export default ProjectsThumb;
