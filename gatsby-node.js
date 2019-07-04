const _ = require(`lodash`);
const slash = require(`slash`);
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage: createPages } = actions;

  const allPages = await graphql(
    `
      {
        allDatoCmsPage {
          nodes {
            slug
          }
        }
      }
    `
  );

  const allProjects = await graphql(
    `
      {
        allDatoCmsProject {
          nodes {
            slug
          }
        }
      }
    `
  );

  await createAllPages(createPages, allPages);
  await createAllProjects(createPages, allProjects);
};

async function createAllPages(createPage, result) {
  if (result.errors) {
    console.log(result.errors);
  }

  const pageTemplate = require.resolve("./src/templates/page.js");

  _.each(result.data.allDatoCmsPage.nodes, node => {
    createPage({
      path: node.slug === "home" ? `/` : `/${node.slug}/`,
      component: slash(pageTemplate),
      context: {
        slug: node.slug
      }
    });
  });
}

async function createAllProjects(createPage, result) {
  if (result.errors) {
    console.log(result.errors);
  }

  const projectTemplate = require.resolve("./src/templates/project.js");

  _.each(result.data.allDatoCmsProject.nodes, node => {
    createPage({
      path: `/${node.slug}/`,
      component: slash(projectTemplate),
      context: {
        slug: node.slug
      }
    });
  });
}
