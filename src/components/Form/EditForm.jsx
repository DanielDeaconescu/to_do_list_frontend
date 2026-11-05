import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCsrfToken } from "../../helpers/getCsrfToken";
import TagsInput from "./TagsInput";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditButton = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  background-color: rgb(36, 83, 98);
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

function EditForm({ onCloseModal, fetchTasks, editTask }) {
  const API_URL = import.meta.env.APP_URL;

  const [taskId, setTaskId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState({ dueDay: "", dueHour: "" });
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    if (!editTask) return;
    setTaskId(editTask?._id);
    setName(editTask?.name);
    setDueDate({
      dueDay: editTask?.dueDate.dueDay,
      dueHour: editTask?.dueDate.dueHour,
    });
    setPriority(editTask?.priority);
    setTags(editTask?.tags);
  }, [editTask]);

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const task = {
      taskId,
      name,
      description,
      dueDate,
      priority,
      tags,
      _csrf: csrfToken,
    };

    const endpoint = editTask ? `${API_URL}/edit-task` : `${API_URL}/add-task`;

    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(task),
      });

      if (!result.ok) throw new Error("Error updating task!");
      onCloseModal();
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledForm onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Task name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dueDate" className="form-label">
          Due date
        </label>

        <div>
          <label htmlFor="dueDay">Day</label>
          <input
            type="date"
            name="dueDay"
            className="form-control"
            value={dueDate?.dueDay?.slice(0, 10)}
            onChange={(e) =>
              setDueDate((prev) => ({ ...prev, dueDay: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="dueHour">Hour</label>
          <input
            type="time"
            name="dueHour"
            className="form-control"
            value={dueDate?.dueHour}
            onChange={(e) =>
              setDueDate((prev) => ({ ...prev, dueHour: e.target.value }))
            }
          />
        </div>
      </div>
      {/* Tags */}
      <TagsInput
        tags={tags}
        setTags={setTags}
        editTask={editTask ? editTask : null}
      />

      <div className="mb-3">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option default value="low">
            Low
          </option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <input type="hidden" name="_csrf" value={csrfToken} />
      <input type="hidden" name="taskId" value={taskId} />

      <EditButton>{editTask ? "Edit task" : "Add task"}</EditButton>
    </StyledForm>
  );
}

export default EditForm;
