import React, {useState} from "react";
import GithubProjectList from "./GithubProjectList";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";

const ProjectModal = ({ setIsOpen, isOpen, repos, cookies, refreshList }) => {
  const customStyles = {
    content: {
      display: "flex",
      justifyContent: "center",
      width: "65%",
      overflow: "scroll",
      height: "70vh",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      textAlign: "left",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px"
    },
    overlay: {
      zIndex: "999"
    }
  };

  // Required to set link modal to react app
  Modal.setAppElement(document.getElementById("root"));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveProject = event => {
    event.preventDefault();
    setIsOpen(false);
    const selectedProject = [];
    for (let project in data) {
      if (data[project] === true) {
        selectedProject.push(project);
      }
    }
    axios
      .post("http://0.0.0.0:8080/project-save", {
        repos: selectedProject,
        github_id: cookies.github_id
      })
      .then(() => {
        refreshList();
      });
  };

  const data = {};

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StyledForm>
          <form method="POST" action="/project-save">
            <GithubProjectList repos={repos} data={data} />
            <button onClick={saveProject} type="submit">
              Submit
            </button>
            <button onClick={closeModal}>Close</button>
          </form>
        </StyledForm>
      </Modal>
    </div>
  );
};

export default ProjectModal;


const StyledForm = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    button {
      border-radius: 10px;
      margin: 5px 15px;
      box-shadow: 0.5px 0.5px 1px 1px;

      &: hover {
        cursor: pointer
        background-color: #666666
        color: white
      }
    }
  }
  cursor: pointer;

`;
