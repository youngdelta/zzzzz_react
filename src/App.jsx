import React, { useState, useEffect, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoRow from "./component/TodoRow";
import TodoCreator from "./component/TodoCreator";
import TodoBanner from "./component/TodoBanner";
import VisibilityControl from "./component/VisibilityControl";

const App = () => {
  const [userName, setUserName] = useState("Adam");
  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false },
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  // localStorage에서 데이터 로드
  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data != null) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData && Array.isArray(parsedData.todoItems)) {
          setUserName(parsedData.userName || "Adam");
          setTodoItems(parsedData.todoItems);
          setShowCompleted(parsedData.showCompleted ?? true);
          return;
        }
      } catch (e) {
        if (import.meta.env.DEV) {
          console.error("Failed to parse todos from localStorage", e);
        }
        localStorage.removeItem("todos");
      }
    }
  }, []);

  // todoItems가 변경될 때 localStorage에 저장
  useEffect(() => {
    const state = { userName, todoItems, showCompleted };
    localStorage.setItem("todos", JSON.stringify(state));
  }, [userName, todoItems, showCompleted]);

  const MAX_TODO_LENGTH = 200;

  const createNewTodo = useCallback((task) => {
    const trimmed = task?.trim();
    if (trimmed && trimmed.length > 0 && trimmed.length <= MAX_TODO_LENGTH) {
      setTodoItems((prevItems) => {
        if (prevItems.find((item) => item.action === trimmed)) {
          return prevItems;
        }
        return [...prevItems, { action: trimmed, done: false }];
      });
    }
  }, []);

  const toggleTodo = useCallback((todo) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    );
  }, []);

  const todoTableRows = useMemo(() => {
    return (doneValue) =>
      todoItems
        .filter((item) => item.done === doneValue)
        .map((item) => (
          <TodoRow key={item.action} item={item} callback={toggleTodo} />
        ));
  }, [todoItems, toggleTodo]);

  return (
    <div>
      <TodoBanner name={userName} tasks={todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={createNewTodo} />
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>{todoTableRows(false)}</tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
        />
      </div>

      {showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{todoTableRows(true)}</tbody>
        </table>
      )}
    </div>
  );
};

export default App;
