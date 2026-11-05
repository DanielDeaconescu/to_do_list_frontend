import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import AddNewTask from "../components/Dashboard/AddNewTask/AddNewTask";
import Task from "../components/Task/Task";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination/Pagination";

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 25px;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const API_URL = import.meta.env.APP_URL;

function MainPage() {
  const [editTask, setEditTask] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tasks, setTasks] = useState(null);
  const [pageInfo, setPageInfo] = useState();
  const page = parseInt(searchParams.get("page"), 10) || 1;

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/?page=${page}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data.tasks);
      setPageInfo(data);

      if (data.currentPage !== page) {
        setSearchParams({ page: data.currentPage }, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, setSearchParams]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <StyledMainPage className="container">
      <AddNewTask fetchTasks={fetchTasks} />
      <StyledList>
        {tasks?.map((task, i) => (
          <Task
            key={task._id}
            task={task}
            fetchTasks={fetchTasks}
            setTaskId={setTaskId}
            taskId={taskId}
            editTask={editTask}
          />
        ))}
      </StyledList>
      <Pagination
        onPageChange={(e) => setSearchParams({ page: e })}
        lastPage={pageInfo?.lastPage}
        currentPage={pageInfo?.currentPage}
      />
    </StyledMainPage>
  );
}

export default MainPage;
