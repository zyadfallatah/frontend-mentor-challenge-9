import Header from "./components/Header";
import BackgroundImage from "./components/BackgroundImage";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTodos, mockupExample } from "./store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todos")!) || undefined;

    if (!localStorage.getItem("todos")) {
      dispatch(setTodos(mockupExample));
      return;
    }

    if (items) dispatch(setTodos(items));
  }, []);

  return (
    <>
      <BackgroundImage />
      <div className="p-6 pt-12 lg:pt-[70px] lg:max-w-[540px] lg:mx-auto">
        <Header />
        <AddTodo />
        <ListTodo />
      </div>
    </>
  );
}

export default App;
