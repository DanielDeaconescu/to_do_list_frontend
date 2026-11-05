import styled from "styled-components";
import DeleteButton from "./DeleteButton/DeleteButton";
import EditButton from "./EditButton/EditButton";
import MarkCompletedButton from "./MarkCompletedButton/MarkCompleted";

const StyledActionButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

function ActionButtons({ task, setIsModalOpen, fetchTasks }) {
  return (
    <StyledActionButtons>
      <EditButton
        task={task}
        setIsModalOpen={setIsModalOpen}
        fetchTasks={fetchTasks}
      />
      <DeleteButton fetchTasks={fetchTasks} task={task} />
      <MarkCompletedButton taskId={task._id} fetchTasks={fetchTasks} />
    </StyledActionButtons>
  );
}

export default ActionButtons;
