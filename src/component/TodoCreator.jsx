import React, { useState, useCallback } from "react";

const TodoCreator = ({ callback }) => {
  const [newItemText, setNewItemText] = useState("");

  const updateNewTextValue = useCallback((event) => {
    setNewItemText(event.target.value);
  }, []);

  const createNewTodo = useCallback(() => {
    if (newItemText && newItemText.trim().length > 0) {
      callback(newItemText.trim());
      setNewItemText("");
    }
  }, [newItemText, callback]);

  return (
    <div className="my-1">
      <input
        className="form-control"
        value={newItemText}
        onChange={updateNewTextValue}
        maxLength={100}
      />
      <button className="btn btn-primary mt-1" onClick={createNewTodo}>
        ADD
      </button>
    </div>
  );
};

export default TodoCreator;
