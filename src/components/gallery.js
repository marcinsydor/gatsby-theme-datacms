import { Lightbox } from "gatsby-theme-ui";
import React, { useState } from "react";
import GalleryThumb from "./gallery-thumb";
import styles from "./gallery.module.scss";

const Gallery = props => {
  const { gallery } = props;
  const [lightbox, useLightbox] = useState(-1);

  const toggleLightbox = index => {
    useLightbox(index);
  };

  if (gallery) {
    return (
      <div className={styles.host}>
        <h2 className={styles.subtitle}>Gallery</h2>
        <ul className={styles.gallery}>
          {gallery.map((item, index) => (
            <GalleryThumb
              key={index}
              onClick={() => toggleLightbox(index)}
              image={item.thumb}
            />
          ))}
        </ul>
        {lightbox >= 0 ? (
          <Lightbox
            images={gallery}
            toggleLightbox={toggleLightbox}
            imageIndex={lightbox}
          />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <div>No photos in the gallery</div>;
  }
};

export default Gallery;
