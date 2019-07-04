import React from "react";
import ProjectsThumb from "./projects-thumb";
import styles from "./projects.module.scss";

const Projects = props => {
  const { projects } = props;
  return (
    <div className={styles.host}>
      <h2 className={styles.subtitle}>Projects</h2>
      <ul className={styles.thumbs}>
        {projects.map((project, index) => {
          return (
            <ProjectsThumb
              key={index}
              title={project.title}
              url={`/${project.slug}`}
              image={project.thumb}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Projects;
