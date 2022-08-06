import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Message } from "../layout/Message";
import { Container } from "../layout/Container";
import { LinkButton } from "../layout/LinkButton";
import { ProjectCard } from "../project/ProjectCard";

import styles from "./styles/Projects.module.css";

export function Projects() {

  const [projects, setProjects] = useState([]);

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {

    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setProjects(data);
      console.log();
    }).catch((err) => console.log(err));

  }, []);
  
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to={"/newproject"} text={"Criar Projeto"}></LinkButton>
      </div>
      {
        message && <Message msg={message} type={"success"} />
      }
      <Container customClass="start">
        {
          projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard 
                  name={project.name}
                  id={project.id}
                  budget={project.budget} 
                  category={project.category.name}
                  key={project.id}
              />
            ))
          ) : (
            <p>Não nenhum projeto no momento.</p>
          )
        }
      </Container>
    </div>
  );
}