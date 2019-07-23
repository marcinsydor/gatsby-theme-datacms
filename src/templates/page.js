import { graphql } from "gatsby";
import { Section, Slideshow } from "gatsby-theme-ui";
import React from "react";
import Content from "../components/content";
import Gallery from "../components/gallery";
import Projects from "../components/projects";
import SEO from "../components/seo";

const PageTemplate = ({ data }) => {
  const { title, blocks } = data.datoCmsPage;

  const getBlockContent = (block, type, key) => {
    switch (type) {
      case "content":
        return (
          <Content>
            <div
              dangerouslySetInnerHTML={{
                __html: block.contentNode.childMarkdownRemark.html
              }}
            />
          </Content>
        );
      case "gallery":
        return block.images && <Gallery gallery={block.images} />;
      case "slideshow":
        return block.images && <Slideshow images={block.images} />;
      case "projects": {
        const projects = block.projects.map(project => {
          return {
            ...project,
            thumb: project.thumb.fluid.src
          };
        });
        return <Projects projects={projects} />;
      }

      default:
        return <div key={key}>{block.model.apiKey} not exists</div>;
    }
  };

  return (
    <>
      <SEO title={title} />

      {blocks &&
        blocks.map((block, key) => {
          const type = block.model.apiKey.replace("_block", "");

          return (
            <Section
              key={key}
              // className="banner"
              type={type}
              fluid={block.sectionImage && block.sectionImage.fluid}
              backgroundImage={block.sectionImage && block.sectionImage.url}
              backgroundColor={block.sectionColor && block.sectionColor.rgb}
              height={`400px`}
            >
              {getBlockContent(block, type, key)}
            </Section>
          );
        })}
    </>
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
                ...GatsbyDatoCmsFluid
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
            fluid(maxWidth: 1200) {
              ...GatsbyDatoCmsFluid
            }
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
