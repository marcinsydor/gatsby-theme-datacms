import React from "react";
import Layout from "../components/layout";
import Section from "../components/section";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <Section height={`400px`} backgroundColor={'#9BD0ED'}>
      <h1>NOT FOUND</h1>
      <p>Page does not exist.</p>
    </Section>
  </Layout>
);

export default NotFoundPage;
