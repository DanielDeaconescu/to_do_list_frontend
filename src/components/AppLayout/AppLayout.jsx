import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 1fr;
  height: 100dvh;
  width: 100%;
`;

const StyledMain = styled.main`
  overflow: auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Navbar />
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
