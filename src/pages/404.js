import React from "react";
import Section from "../components/section";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />

    <Section height={`400px`} backgroundColor={`#9BD0ED`}>
      <h1>NOT FOUND</h1>
      <p>Page does not exist.</p>
    </Section>
  </>
);

export default NotFoundPage;
