import styled from "styled-components";
import Form from "../components/ResetPassword/ResetPasswordForm";
import ResetPasswordForm from "../components/ResetPassword/ResetPasswordForm";

const StyledResetPassword = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
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

function ResetPassword() {
  return (
    <StyledResetPassword>
      <ResetPasswordForm />
    </StyledResetPassword>
  );
}

export default ResetPassword;
