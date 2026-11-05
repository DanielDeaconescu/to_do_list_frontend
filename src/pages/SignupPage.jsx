import styled from "styled-components";
import SignupForm from "../components/Signup/SignupForm";

const StyledSignupPage = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 100%;
  background-image: url("https://images.unsplash.com/photo-1769276029529-48eca533bbfb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
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

function SignupPage() {
  return (
    <StyledSignupPage>
      <SignupForm />
    </StyledSignupPage>
  );
}

export default SignupPage;
