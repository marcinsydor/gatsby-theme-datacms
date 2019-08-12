import { graphql } from "gatsby";
import { Section } from "gatsby-theme-ui";
import React from "react";
import Content from "../components/content";
import Gallery from "../components/gallery";
import SEO from "../components/seo";

const ProjectTemplate = ({ data }) => {
  const { title, gallery, image, contentNode } = data.datoCmsProject;

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

      <Section fluid={image.fluid} type={"content"}>
        <Content>
          <h1>{title}</h1>
        </Content>
      </Section>

      <Section type={"content"}>
        <Content>{contentNode.childMdx.body}</Content>
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
      contentNode {
        childMdx {
          body
        }
      }
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
