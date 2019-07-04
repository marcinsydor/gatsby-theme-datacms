// import { Link } from "gatsby";
import React from "react";
import styles from "./gallery-thumb.module.scss";

const GalleryThumb = props => {
  const { title, image, onClick } = props;

  return (
    <li className={styles.host} onClick={onClick}>
      {/* <Link className={styles.link} to={`#`}> */}
      {/* <Img fluid={image.placeholderImage.childImageSharp.fluid} /> */}
      <div className={styles.title}>{title}</div>

      {image ? (
        <img className={styles.image} alt={title} src={image} />
      ) : (
        "No image"
      )}
      {/* </Link> */}
    </li>
  );
};

export default GalleryThumb;
