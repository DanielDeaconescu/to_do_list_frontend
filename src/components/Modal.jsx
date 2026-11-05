import styled from "styled-components";
import { createPortal } from "react-dom";
import { useClickOutside } from "../hooks/useClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const StyledModal = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Window = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 35%;
  max-height: 500px;
  overflow: auto;
  position: relative;
`;

const CloseBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: 10px;
  right: 5px;
`;

function Modal({ children, isModalOpen, onCloseModal, label = "Dialog" }) {
  const ref = useClickOutside(onCloseModal);

  if (!isModalOpen) return null;

  return createPortal(
    <StyledModal>
      <Window ref={ref} role="dialog" aria-modal="true" aria-label={label}>
        <CloseBtnContainer>
          <CloseBtn type="button" onClick={() => onCloseModal()}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseBtn>
        </CloseBtnContainer>
        {children}
      </Window>
    </StyledModal>,
    document.body,
  );
}

export default Modal;
