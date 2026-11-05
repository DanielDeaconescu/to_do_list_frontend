import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledResetPasswordButton = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  margin-top: 1rem;
  color: #fff;
`;

function ResetPasswordButton() {
  return (
    <StyledResetPasswordButton>
      <StyledLink to="/reset">Reset password</StyledLink>
    </StyledResetPasswordButton>
  );
}

export default ResetPasswordButton;
