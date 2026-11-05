import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(10, 38, 71);
  color: #fff;
  padding: 1rem;
`;

function Footer() {
  return (
    <StyledFooter>
      <div>Created by Webvertize</div>
      <div>All rights reserved</div>
      <div>2026</div>
    </StyledFooter>
  );
}

export default Footer;
