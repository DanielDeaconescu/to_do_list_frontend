import { useState } from "react";
import styled from "styled-components";
import Modal from "../../Modal";

import EditForm from "../../Form/EditForm";

const StyledButton = styled.button`
  border: none;
  background-color: rgb(32, 82, 149);
  color: #fff;
  padding: 0.6rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`;

function AddNewTask({ fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <StyledButton onClick={() => setIsModalOpen(true)}>
        Add new task
      </StyledButton>
      <Modal isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
        <EditForm onCloseModal={onCloseModal} fetchTasks={fetchTasks} />
      </Modal>
    </div>
  );
}

export default AddNewTask;
