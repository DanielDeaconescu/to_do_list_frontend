import { Fragment } from "react";
import styled from "styled-components";

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  display: flex;
  border: none;
  background-color: ${(props) =>
    props.$active ? "rgba(44, 116, 179, 1)" : "rgba(44, 116, 179, 0.65)"};
  border-radius: 0.25rem;
  color: white;
`;

function getPages(current, last) {
  const pages = new Set([1, current - 1, current, current + 1, last]);
  return [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);
}

function Pagination({ onPageChange, lastPage, currentPage }) {
  if (!lastPage || lastPage <= 1) return null;
  const pages = getPages(currentPage, lastPage);
  return (
    <StyledPagination>
      {pages.map((p, i) => (
        <Fragment key={p}>
          {i > 0 && p - pages[i - 1] > 1 && <span>...</span>}
          <StyledButton
            $active={p === currentPage}
            onClick={() => onPageChange(p)}
          >
            {p}
          </StyledButton>
        </Fragment>
      ))}
    </StyledPagination>
  );
}

export default Pagination;
