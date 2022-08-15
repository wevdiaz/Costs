import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Loading } from "../layout/Loading";
import { Container } from "../layout/Container";
import { ProjectForm } from "../project/ProjectForm";
import { Message } from "../layout/Message";
import { ServiceForm } from "../services/ServiceForm";
import { ServiceCard } from "../services/ServiceCard";

import styles from "./styles/Project.module.css";

export function Project() {

  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data);
      setServices(data.services);
    })
    .catch((err) => console.log(err));

  }, [id]);

  function editPost(project) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(data);
      setShowProjectForm(false);
      setMessage("Projeto atualizado com sucesso");
      setType("success");
    })
    .catch((err) => { console.log(err)})
  }

  function createService(project) {
    setMessage("");

    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      setShowServiceForm(false);
    }).catch((err) => console.log(err));


  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function removeService(id, cost) {
    setMessage("");

    const servicesUpdated = project.services.filter((service) => service.id !== id);

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectUpdated),
    })
    .then((response) => response.json())
    .then((data) => {
      setProject(projectUpdated);
      setServices(servicesUpdated);
      setMessage("Projeto Removido com sucesso!");
      setType("success");
    })
    .catch((err) => console.log(err));

  }


  return (
    <>
      {
        project.name ? ( 
            <div className={styles.project_details}>
              <Container customClass="column">
                { message && <Message msg={message} type={type} />}
                <div className={styles.details_container}>
                  <h1>Projeto: {project.name}</h1>
                  <button className={styles.btn} onClick={toggleProjectForm}>
                    { !showProjectForm ? "Editar projeto" : "fechar" }
                  </button>
                  {
                    !showProjectForm ? (
                     <div className={styles.project_info}>
                      <p>
                        <span>Categoria:</span> {project.category.name}
                      </p>
                      <p>
                        <span>Total de Orçamento:</span> {project.budget}
                      </p>
                      <p>
                        <span>Total utilizado:</span> {project.cost}
                      </p>
                     </div>
                    ) : (
                     <div className={styles.project_info}>
                       <ProjectForm
                          handleSubmit={editPost}
                          btnText="Concluir Edição"
                          projectData={project}
                       />
                     </div>
                    )
                  }
                </div>
                <div className={styles.service_form_container}>
                  <h2>Adicione um serviço</h2>
                  <button className={styles.btn} onClick={toggleServiceForm}>
                    { !showServiceForm ? "Adicionar serviço" : "fechar" }
                  </button>
                  <div className={styles.project_info}>
                    { showServiceForm && (
                      <ServiceForm
                          handleSubmit={createService}
                          btnText="Adicionar serviço"
                          projectData={project}
                      />
                    ) }
                  </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                  { services.length > 0 && 
                      services.map((service) => (
                        <ServiceCard 
                          id={service.id}
                          name={service.name}
                          cost={service.cost}
                          description={service.description}
                          key={service.id}
                          handleRemove={removeService}
                        />
                      ))
                  }
                  { services.length === 0 && <p>Não nenhum serviço até o momento!</p>}
                </Container>
              </Container>
            </div>
         ) : ( <Loading /> )
      }
    </>
  );
}