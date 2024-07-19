import { useRef } from "react";
import { addTodo } from "../store";
import { useDispatch } from "react-redux";
const AddTodo = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 bg-todo-color px-5 rounded-[5px] mt-10 mb-4">
      <span className="block size-5 max-w-5 rounded-full border border-text-alt-color flex1"></span>

      <input
        ref={input}
        type="text"
        className="w-full outline-0 bg-todo-color text-[12px] lg:text-[18px] text-text-color py-[14px] flex-1"
        placeholder="Create a new todo..."
        onKeyDown={(e) => {
          if (e.currentTarget.value === "") return;

          if (e.key === "Enter") {
            dispatch(addTodo(e.currentTarget.value));
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default AddTodo;
