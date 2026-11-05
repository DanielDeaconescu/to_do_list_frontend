import { useState } from "react";
import Modal from "../../../Modal";
import DeleteForm from "./DeleteForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  border: none;
  background-color: rgb(175, 50, 50);
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.25rem;
`;

function DeleteButton({ task, fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onCloseModal = () => setIsModalOpen(false);
  console.log("task in DeleteButton: ", task);
  return (
    <>
      <StyledButton
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </StyledButton>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
          <DeleteForm
            onCloseModal={onCloseModal}
            taskId={task._id}
            fetchTasks={fetchTasks}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteButton;
