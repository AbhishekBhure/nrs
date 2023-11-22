import { useState } from "react";

const Response = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTodo = () => {
    if (editIndex !== null) {
      // Edit existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTodo;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo
      if (newTodo.trim() !== "") {
        setTodos([newTodo, ...todos]);
      }
    }

    setNewTodo("");
    setShowInput(false);
    setIsInputEmpty(true);
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
    setIsInputEmpty(e.target.value.trim() === "");
  };

  const handleCancel = () => {
    setShowInput(false);
    setNewTodo("");
    setIsInputEmpty(true);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewTodo(todos[index]);
    // setShowInput(true);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>ToDo List</h1>
      </div>
      <div className="todo-body">
        <div className="todo-input">
          {showInput && (
            <div>
              <input
                type="text"
                value={newTodo}
                onChange={handleInputChange}
                placeholder="Enter a new task"
              />
              <button onClick={handleAddTodo} disabled={isInputEmpty}>
                {editIndex !== null ? "Edit" : "Add"}
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleAddTodo} disabled={isInputEmpty}>
                    {editIndex !== null ? "Edit" : "Add"}
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <p>
                  {todo}
                  <button onClick={() => handleEdit(index)}>edit</button>
                  <button onClick={() => handleDelete(index)}>delete</button>
                </p>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setShowInput(true)}>Add Todo</button>
      </div>
    </div>
  );
};

export default Response;
