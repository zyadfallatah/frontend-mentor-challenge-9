import TodoItem from "./TodoItem";
import TodoStatus from "./TodoStatus";
import { useSelector, useDispatch } from "react-redux";
import { todoSelector, clearTodos, TodoType, setTodos } from "../store";
import { useRef } from "react";

// This Component will be container to dragover...
type ElementDrag = {
  element: Element | null;
  offset: number;
};

function getElementAfter(container: HTMLUListElement, mouseY: number) {
  const element = [
    ...container.querySelectorAll("li:not(.dragged)"),
  ].reduce<ElementDrag>(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = mouseY - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset)
        return { element: child, offset: offset };

      return closest;
    },

    { element: null, offset: Number.NEGATIVE_INFINITY }
  );

  return element.element;
}

const ListTodo = () => {
  const {
    todos: { value: todos, cache },
  } = useSelector(todoSelector);
  const dispatch = useDispatch();

  const container = useRef<HTMLUListElement>(null);
  const todoRef = useRef<HTMLLIElement>(null);

  function updateStateInside() {
    const todosMap = new Map();
    todos.forEach((todo) => {
      todosMap.set(todo.todoID, todo);
    });

    const newList: TodoType[] = [...container.current!.querySelectorAll("li")]
      .map((element) => {
        return element.id;
      })
      .map((stringID) => {
        return Number.parseInt(stringID.slice(stringID.indexOf("-") + 1));
      })
      .map((numberID) => {
        return todosMap.get(numberID);
      });

    dispatch(setTodos(newList));
    localStorage.setItem("todos", JSON.stringify(newList));
  }

  return (
    <div className=" shadow-xl shadow-bg-bg-color">
      <ul
        ref={container}
        className="bg-todo-color rounded-[5px]"
        onDragOver={(e) => {
          if (cache !== "ALL") return;

          e.preventDefault();
          const afterElement = getElementAfter(container.current!, e.clientY);
          if (afterElement === null)
            container.current!.append(todoRef.current!);
          else container.current!.insertBefore(todoRef.current!, afterElement);
          updateStateInside();
        }}
      >
        {todos.map((todo) => {
          return <TodoItem todo={todo} accessRef={todoRef} key={todo.todoID} />;
        })}
      </ul>

      <footer className="text-[12px] flex justify-between bg-todo-color py-4 px-5">
        <p className="text-text-light-color">
          {todos.filter((todo) => todo.completed === false).length} items left
        </p>
        <TodoStatus desktopDisplay={true} />
        <p
          className="text-text-light-color cursor-pointer hover:text-text-color"
          onClick={() => dispatch(clearTodos())}
        >
          Clear Completed
        </p>
      </footer>
      <TodoStatus />
    </div>
  );
};

export default ListTodo;
