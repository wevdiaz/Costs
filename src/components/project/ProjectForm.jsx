import { useState, useEffect } from "react";

import { Input } from "../form/Input";
import { Select } from "../form/Select";
import { SubmitButton } from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

export function ProjectForm({btnText}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((response) => response.json())
  .then((data) => setCategories(data))
  .catch((err) => console.log(err));

  }, []);

  return (
    <form className={styles.form}>
      <Input 
          type={"text"} 
          name={"name"} 
          text="Nome do Projeto" 
          placeholder={"Insira um nome para o projeto"} 
      />

      <Input 
          type={"number"} 
          name={"budget"} 
          text="Orçamento" 
          placeholder={"Insira o orçamento"} 
      />

      <Select name={"category_id"} text="Selecione uma categoria" options={categories} />
            
      <SubmitButton text={btnText} />
      
    </form>
  );
}