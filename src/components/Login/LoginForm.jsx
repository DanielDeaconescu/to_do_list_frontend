import { useEffect } from "react";
import { useState } from "react";
import { getCsrfToken } from "../../helpers/getCsrfToken";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ResetPasswordButton from "./ResetPasswordButton";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  color: #fff;
`;

const Error = styled.div`
  font-weight: 500;
  color: red;
  margin-top: 0.25rem;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  console.log(csrfToken);

  const API_URL = "http://localhost:8000";
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, _csrf: csrfToken }),
      });
      const data = await result.json();
      setError(data.errors ? data.errors : "");
      setValidationError(data.errorsV ? data.errorsV : "");

      if (!result.ok) throw new Error(data.message || "Login failed!");
      login();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)} noValidate>
      {error && <Error>{error}</Error>}

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
        {validationError && <Error>{validationError.email?.msg}</Error>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {validationError && <Error>{validationError.password?.msg}</Error>}
      </div>
      {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}

      <button type="submit" className="btn btn-primary">
        Log In
      </button>
      <ResetPasswordButton />
    </StyledForm>
  );
}

export default LoginForm;
