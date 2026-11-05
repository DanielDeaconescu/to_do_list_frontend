import { useState } from "react";
import Modal from "../../../Modal";
import styled from "styled-components";
import EditForm from "../../../Form/EditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  border: none;
  background-color: rgba(10, 38, 71, 0.75);
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.25rem;
`;

function EditButton({ task, fetchTasks }) {
  const API_URL = import.meta.env.VITE_APP_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const onCloseModal = () => setIsModalOpen(false);

  async function getTask() {
    try {
      const res = await fetch(`${API_URL}/edit-task/${task._id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Could not get that task!");
      const data = await res.json();
      setEditTask(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <StyledButton
        onClick={() => {
          console.log(task._id);
          getTask();
          setIsModalOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </StyledButton>

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
          <EditForm
            editTask={editTask}
            onCloseModal={onCloseModal}
            fetchTasks={fetchTasks}
          />
        </Modal>
      )}
    </>
  );
}

export default EditButton;
