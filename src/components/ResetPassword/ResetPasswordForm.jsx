import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCsrfToken } from "../../helpers/getCsrfToken";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  color: #fff;
`;

function ResetPasswordForm() {
  const [email, setEmail] = useState("");

  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  const API_URL = import.meta.env.VITE_APP_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${API_URL}/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, _csrf: csrfToken }),
      });
      const data = await result.json();

      if (!result.ok) {
        setError(data.errors);
        throw new Error(data.message || "Reset password failed!");
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <div>{error.email.msg}</div>}
      </div>
      <input type="hidden" name="_csrf" value={csrfToken} />

      <button className="btn btn-primary" type="submit">
        Reset password
      </button>
    </StyledForm>
  );
}

export default ResetPasswordForm;
