import { graphql } from "gatsby";
import React from "react";
import Gallery from "../components/gallery";
import Layout from "../components/layout";
import Section from "../components/section";
import SEO from "../components/seo";

const ProjectTemplate = ({ data }) => {
  const { title, gallery, image, content } = data.datoCmsProject;

  gallery.map(image => ({
    ...image,
    thumb: image.url
  }));
  // thumb: image.thumb.childImageSharp.resize.src

  return (
    <Layout>
      <SEO title={title} />

      <Section backgroundImage={image.url} height={`400px`} type={"content"}>
        <h1 className="title">{title}</h1>
      </Section>

      <Section height={`400px`} type={"content"}>
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </Section>

      {gallery && (
        <Section type={"gallery"}>
          <Gallery gallery={gallery} />
        </Section>
      )}
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    datoCmsProject(slug: { eq: $slug }) {
      title
      slug
      content
      image {
        url
        alt
      }
      gallery {
        thumb: url
        url
        alt
      }
    }
  }
`;

export default ProjectTemplate;
