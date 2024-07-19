import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterActiveTodos,
  filterCompletedTodos,
  removeTodoFilters,
} from "../store";

export type StatusType = {
  ALL: "ALL";
  ACTIVE: "ACTIVE";
  COMPLETED: "COMPLETED";
};

// eslint-disable-next-line react-refresh/only-export-components
export const STATUS: StatusType = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};

const TodoStatus = ({
  desktopDisplay = false,
}: {
  desktopDisplay?: boolean;
}) => {
  const [currentState, setCurrentState] = useState<keyof typeof STATUS>(
    STATUS.ALL
  );

  const dispatch = useDispatch();
  return (
    <div
      className={`flex justify-center items-center gap-[19px] bg-todo-color font-bold text-text-light-color ${
        desktopDisplay
          ? "hidden lg:flex"
          : "lg:hidden rounded-[5px] py-[15px] mt-4"
      }`}
    >
      <p
        className={`text-[14px] hover:text-text-color cursor-pointer ${
          currentState === STATUS.ALL && "text-blue-color"
        }`}
        onClick={() => {
          setCurrentState(STATUS.ALL);
          dispatch(removeTodoFilters());
        }}
      >
        All
      </p>
      <p
        className={`text-[14px] hover:text-text-color cursor-pointer ${
          currentState === STATUS.ACTIVE && "text-blue-color"
        }`}
        onClick={() => {
          setCurrentState(STATUS.ACTIVE);
          dispatch(filterActiveTodos());
        }}
      >
        Active
      </p>
      <p
        className={`text-[14px] hover:text-text-color cursor-pointer ${
          currentState === STATUS.COMPLETED && "text-blue-color"
        }`}
        onClick={() => {
          setCurrentState(STATUS.COMPLETED);
          dispatch(filterCompletedTodos());
        }}
      >
        Completed
      </p>
    </div>
  );
};

export default TodoStatus;
