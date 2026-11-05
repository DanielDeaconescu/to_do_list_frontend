function TaskInfo({ task }) {
  console.log("task in TaskInfo: ", task);

  return (
    <div className="ms-2 me-auto">
      <div>
        <h4>{task?.name.toUpperCase()}</h4>
        <div>{task?.description}</div>
      </div>
      <div>
        <strong>Due date</strong>
        <span>{task?.dueDate?.dueDate?.slice(0, 10)}</span>
        <div className="ms-4">
          <span>
            <strong>Day: </strong>
            {task.dueDate.dueDay}
          </span>
        </div>
        <div className="ms-4">
          <span>
            <strong>Hour: </strong>
            {task.dueDate.dueHour}
          </span>
        </div>
      </div>
      <div>
        <strong>Tags:</strong>{" "}
        <span>
          {task?.tags.map((tag, i) => (
            <span key={i}>{"#" + tag} </span>
          ))}
        </span>
      </div>
      <div>
        <strong>Priority: </strong>
        <span>{task?.priority.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default TaskInfo;
