import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getCsrfToken } from "../../helpers/getCsrfToken";
import styled from "styled-components";

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  cursor: pointer;
`;

function Logout() {
  const API_URL = "http://localhost:8000";
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleClick(e) {
    e.preventDefault();
    try {
      const csrfToken = await getCsrfToken();

      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      await res.json();

      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return <StyledLink onClick={handleClick}>Log out</StyledLink>;
}

export default Logout;
