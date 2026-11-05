import styled from "styled-components";
import Logout from "../Logout/Logout";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const StyledUl = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  background-color: rgb(10, 38, 71);
  list-style: none;
  gap: 0.5rem;
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <StyledUl>
      {isAuthenticated && (
        <li>
          <StyledLink to="/">Tasks</StyledLink>
        </li>
      )}
      {!isAuthenticated && (
        <li>
          <StyledLink to="/login">Log in</StyledLink>
        </li>
      )}
      <li>{isAuthenticated && <Logout />}</li>
      {!isAuthenticated && (
        <li>
          <StyledLink to="/signup">Sign up</StyledLink>
        </li>
      )}
    </StyledUl>
  );
}

export default Navbar;
