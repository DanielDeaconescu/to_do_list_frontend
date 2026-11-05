import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCsrfToken } from "../../../../helpers/getCsrfToken";

const StyledForm = styled.form``;

const DeleteButton = styled.button`
  border: none;
  background-color: rgb(175, 50, 50);
  color: #fff;
  border-radius: 0.25rem;
`;

const CancelButton = styled.button`
  border: none;
  background-color: rgb(129, 128, 128);
  color: #fff;
  border-radius: 0.25rem;
`;

function DeleteForm({ onCloseModal, taskId, fetchTasks }) {
  const API_URL = import.meta.env.VITE_APP_URL;
  const [csrfToken, setCsrfToken] = useState();

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch(`${API_URL}/delete-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(
          taskId ? { taskId: taskId, _csrf: csrfToken } : {},
        ),
      });
      if (!result.ok) throw new Error("Failed to delete task!");
      console.log("this ran");
      await fetchTasks();
      onCloseModal();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <h4>Are you sure you want to delete the task?</h4>
      <div className="d-flex gap-3">
        <DeleteButton className="btn btn-danger">Delete</DeleteButton>
        <CancelButton
          className="btn btn-secondary"
          onClick={() => onCloseModal()}
        >
          Cancel
        </CancelButton>
      </div>
    </StyledForm>
  );
}

export default DeleteForm;
