import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState();
  const [validationError, setValidationError] = useState("");
  const API_URL = import.meta.env.VITE_APP_URL;

  const navigate = useNavigate();

  useEffect(() => {
    async function getCsrfToken() {
      const result = await fetch(`${API_URL}/csrf`, { credentials: "include" });
      const data = await result.json();
      setCsrfToken(data.csrfToken);
    }
    getCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          _csrf: csrfToken,
        }),
      });

      const data = await result.json();
      setValidationError(data.errors);
      console.log(validationError);

      if (!result.ok) throw new Error(data.message || "Signup failed!");

      // navigate to /login
      navigate("/login");
    } catch (error) {
      // clearPasswords();
      console.log(error);
    }
  };

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)} noValidate>
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
      <div className="mb-3">
        <label htmlFor="passwordConfirm" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {validationError && (
          <Error>{validationError.confirmPassword?.msg}</Error>
        )}
      </div>
      <input type="hidden" name="_csrf" value={csrfToken} />
      <button className="btn btn-primary" type="submit">
        Sign Up
      </button>
    </StyledForm>
  );
}

export default SignupForm;
