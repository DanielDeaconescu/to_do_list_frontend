import styled from "styled-components";
import ActionButtons from "./ActionButtons/ActionButtons";
import TaskInfo from "./TaskInfo/TaskInfo";

const StyledTask = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.$completed
      ? "rgba(22, 196, 127, 0.6)"
      : props.$priority === "low"
        ? "rgb(247, 136, 136)"
        : props.$priority === "medium"
          ? "rgb(211, 59, 59)"
          : "rgb(101, 27, 27)"};
`;

function Task({ task, fetchTasks }) {
  console.log("task in Task: ", task);

  return (
    <StyledTask $completed={task.completed} $priority={task.priority}>
      <TaskInfo task={task} />
      {/* Action buttons */}
      <ActionButtons task={task} fetchTasks={fetchTasks} />
    </StyledTask>
  );
}

export default Task;
