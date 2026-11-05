import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledTagsInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledButton = styled.button`
  border: none;
  background-color: rgb(208, 95, 95);
  color: #fff;
  padding: 0.25rem;
  border-radius: 0.25rem;
`;

const SingleTag = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function TagsInput({ editTask, tags, setTags }) {
  const [currentTag, setCurrentTag] = useState("");
  const [currentEditedTag, setCurrentEditedTag] = useState("");

  useEffect(() => {
    if (editTask) {
      setTags(editTask.tags);
    } else {
      setTags([]);
    }
  }, [editTask, setTags]);

  function handleAddTag(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!currentTag || tags.includes(currentTag)) return;
      setTags((prev) => [...prev, currentTag]);
      setCurrentTag("");
    }
  }

  function handleEditTag(index, newValue) {
    setTags((prev) => prev.map((tag, i) => (i === index ? newValue : tag)));
  }

  function handleDeleteTag(index, e) {
    e.preventDefault();
    setTags((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <StyledTagsInput className="mb-3">
      <label htmlFor="tags" className="form-label">
        Tags
      </label>

      <input
        type="text"
        name="tags"
        className="form-control"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={(e) => handleAddTag(e)}
      />

      <Tags>
        {tags?.map((tag, i) => {
          return (
            <SingleTag className="d-flex" key={tag}>
              <input
                type="text"
                value={tag}
                className="form-control"
                onChange={(e) => handleEditTag(i, e.target.value)}
              />
              <StyledButton onClick={(e) => handleDeleteTag(i, e)}>
                delete
              </StyledButton>
            </SingleTag>
          );
        })}
      </Tags>
    </StyledTagsInput>
  );
}

export default TagsInput;
