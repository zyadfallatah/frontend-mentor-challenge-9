import checked from "/images/icon-check.svg";
import remove from "/images/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { TodoType, removeTodo, toggleCompletion, todoSelector } from "../store";
import { useState } from "react";

const TodoItem = ({
  todo,
  accessRef,
}: {
  todo: TodoType;
  accessRef: React.RefObject<HTMLLIElement>;
}) => {
  const [isDragged, setISDragged] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {
    todos: { cache },
  } = useSelector(todoSelector);

  const dispatch = useDispatch();
  return (
    <li
      ref={isDragged ? accessRef : null}
      className={`${disabled ? "bg-red-400" : ""} ${
        isDragged ? "dragged" : ""
      }`}
      draggable={true}
      id={`todo-${todo.todoID}`}
      onDragStart={() => {
        if (cache !== "ALL") {
          setDisabled(true);
          return;
        }
        setISDragged(true);
      }}
      onDragEnd={() => {
        if (cache !== "ALL") {
          setDisabled(false);
          return;
        }
        setISDragged(false);
      }}
    >
      <div
        className={`flex justify-between items-center px-5 py-4 gap-3 text-text-color border-b border-solid border-text-alt-color cursor-pointer duration-300
        ${
          isDragged &&
          "text-very-light bg-gradient-to-r from-gradient-from to-gradient-to opacity-70 scale-[1.01]"
        }
        `}
      >
        <div className="flex items-center gap-3">
          <span
            className="p-[1px] hover:bg-gradient-to-r from-gradient-from to-gradient-to rounded-full"
            onClick={() => dispatch(toggleCompletion(todo.todoID))}
          >
            <span
              className={`grid size-[20px] place-items-center bg-todo-color rounded-full border border-text-alt-color self-center
            ${
              todo.completed &&
              "bg-gradient-to-r from-gradient-from to-gradient-to"
            }`}
            >
              {todo.completed && <img src={checked} alt="checked image"></img>}
            </span>
          </span>
          <p
            className={`text-[12px] lg:text-[18px] ${
              todo.completed && " text-text-alt-color line-through"
            }`}
          >
            {todo.todoName}
          </p>
        </div>
        <img
          src={remove}
          alt="remove image"
          className="max-w-3 cursor-pointer"
          onClick={() => {
            dispatch(removeTodo(todo.todoID));
          }}
        />
      </div>
    </li>
  );
};

export default TodoItem;
