import { graphql } from "gatsby";
import React from "react";
import Gallery from "../components/gallery";
import Section from "../components/section";
import SEO from "../components/seo";

const ProjectTemplate = ({ data }) => {
  const { title, gallery, image, content } = data.datoCmsProject;

  const convertedGallery = gallery.map(image => {
    return {
      title: `title: ` + image.title,
      alt: image.alt,
      url: image.image.src,
      thumb: image.thumb
    };
  });

  return (
    <>
      <SEO title={title} />

      <Section
        backgroundImage={image.fluid.src}
        height={`400px`}
        type={"content"}
      >
        <h1 className="title">{title}</h1>
      </Section>

      <Section height={`400px`} type={"content"}>
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </Section>

      {convertedGallery && (
        <Section type={"gallery"}>
          <Gallery gallery={convertedGallery} />
        </Section>
      )}
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    datoCmsProject(slug: { eq: $slug }) {
      title
      slug
      content
      image {
        fluid(
          maxWidth: 1200
          imgixParams: { fm: "jpg", auto: "compress", fit: "clip", w: "1200" }
        ) {
          ...GatsbyDatoCmsFluid
        }
      }
      gallery {
        title
        alt
        thumb: fluid(
          maxWidth: 360
          imgixParams: {
            fm: "jpg"
            auto: "compress"
            fit: "crop"
            w: "360"
            h: "360"
          }
        ) {
          ...GatsbyDatoCmsFluid
        }
        image: fluid(
          maxWidth: 1200
          imgixParams: { fm: "jpg", auto: "compress", fit: "clip", w: "1200" }
        ) {
          ...GatsbyDatoCmsFluid
        }
      }
    }
  }
`;

export default ProjectTemplate;
