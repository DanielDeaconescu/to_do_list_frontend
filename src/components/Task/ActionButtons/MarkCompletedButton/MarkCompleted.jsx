import { useEffect, useState } from "react";
import { getCsrfToken } from "../../../../helpers/getCsrfToken";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const StyledButton = styled.button`
  border: none;
  background-color: rgb(82, 141, 60);
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.25rem;
`;

function MarkCompletedButton({ taskId, fetchTasks }) {
  const [csrfToken, setCsrfToken] = useState(null);
  const API_URL = import.meta.env.APP_URL;
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/completed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskId, _csrf: csrfToken }),
      });
      if (!res.ok) throw new Error("Failed to mark task completed!");

      await res.json();
      setCompleted((t) => !t);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <StyledButton>
        <FontAwesomeIcon icon={faCircleCheck} />
      </StyledButton>
    </form>
  );
}

export default MarkCompletedButton;
