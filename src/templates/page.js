import { graphql } from "gatsby";
import { Slideshow } from "gatsby-theme-ui";
import React from "react";
import Gallery from "../components/gallery";
import Layout from "../components/layout";
import Projects from "../components/projects";
import Section from "../components/section";
import SEO from "../components/seo";

const PageTemplate = ({ data }) => {
  const { title, blocks } = data.datoCmsPage;

  const getBlockContent = (block, type, key) => {
    switch (type) {
      case "content":
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: block.contentNode.childMarkdownRemark.html
            }}
          />
        );
      case "gallery":
        return <Gallery gallery={block.images} />;
      case "slideshow":
        return block.images && <Slideshow images={block.images} />;
      case "projects": {
        const projects = block.projects.map(project => ({
          ...project,
          thumb: project.thumb.fluid.src
        }));
        return <Projects projects={projects} />;
      }

      default:
        return <div key={key}>{block.model.apiKey} not exists</div>;
    }
  };

  return (
    <Layout>
      <SEO title={title} />

      {blocks &&
        blocks.map((block, key) => {
          const type = block.model.apiKey.replace("_block", "");

          return (
            <Section
              key={key}
              // className="banner"
              type={type}
              backgroundImage={block.sectionImage && block.sectionImage.url}
              backgroundColor={block.sectionColor && block.sectionColor.rgb}
              height={`400px`}
            >
              {getBlockContent(block, type, key)}
            </Section>
          );
        })}
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    datoCmsPage(slug: { eq: $slug }) {
      slug
      title
      blocks {
        ... on DatoCmsSlideshowBlock {
          model {
            apiKey
          }
          images {
            url
          }
        }
        ... on DatoCmsProjectsBlock {
          model {
            apiKey
          }
          projects {
            title
            slug
            content
            thumb: image {
              fluid(
                maxWidth: 360
                imgixParams: {
                  fm: "jpg"
                  auto: "compress"
                  fit: "crop"
                  w: "360"
                  h: "360"
                }
              ) {
                width
                height
                src
              }
            }
          }
        }
        ... on DatoCmsContentBlock {
          model {
            apiKey
          }
          content
          contentNode {
            childMarkdownRemark {
              html
            }
          }
          sectionImage {
            url
          }
          sectionColor {
            rgb
          }
        }
      }
    }
  }
`;

export default PageTemplate;
