import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCsrfToken } from "../helpers/getCsrfToken";

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1654588831193-0285dab84d5a?q=80&w=1708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 1;
  }
`;

const Message = styled.h3`
  display: flex;

  position: relative;
  z-index: 2;
  color: #fff;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  color: #fff;
`;

function NewPassword() {
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const [statusLink, setStatusLink] = useState("checking");
  const API_URL = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  useEffect(() => {
    async function getLinkValidation() {
      try {
        const result = await fetch(`${API_URL}/reset/${token}`, {
          credentials: "include",
        });
        setStatusLink(result.ok ? "valid" : "invalid");
      } catch (error) {
        setStatusLink("invalid");
      }
    }

    getLinkValidation();
  }, [token]);

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${API_URL}/new-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password, token, _csrf: csrfToken }),
      });
      const data = await result.json();
      setError(data.error ? data.error : "");

      if (!result.ok) throw new Error(data.message || "Password reset failed!");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (statusLink === "checking") return <div>Checking link...</div>;
  if (statusLink === "invalid")
    return (
      <StyledLogin>
        <Message>Invalid or expired token!</Message>
      </StyledLogin>
    );

  return (
    <StyledLogin>
      <StyledForm onSubmit={(e) => handleSubmit(e)}>
        {error && <div>{error}</div>}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="hidden" name="_csrf" value={csrfToken} />

        <button type="submit" className="btn btn-primary">
          Reset password
        </button>
      </StyledForm>
    </StyledLogin>
  );
}

export default NewPassword;
