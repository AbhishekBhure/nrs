import { useState } from "react";
import { add, trash, edit, save } from "../icons";

const Response = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [isTodoLimitReached, setIsTodoLimitReached] = useState(false);

  var maxCharater = 150;
  const handleAddTodo = () => {
    if (editIndex !== null) {
      // Edit existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTodo;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo if the limit is not reached
      if (todos.length < 10 && newTodo.trim() !== "") {
        setTodos([...todos, newTodo]);
      } else {
        // Update state to indicate that the todo limit is reached
        setIsTodoLimitReached(true);
        return; // Exit the function without further execution
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
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);

    // Check if the todo limit was reached and update the state
    if (isTodoLimitReached && updatedTodos.length < 10) {
      setIsTodoLimitReached(false);
    }
  };

  return (
    <div className="response-container">
      <div className="response-body">
        <ul className="response-list">
          {todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <div className="input-btns">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    maxLength={maxCharater}
                  />
                  <div className="edit-add-btn">
                    <span className="characters">
                      {newTodo.trim().length} / {maxCharater}
                    </span>
                    <button
                      className={
                        isInputEmpty
                          ? "edit-Response-btn grey"
                          : "edit-Response-btn"
                      }
                      onClick={handleAddTodo}
                      disabled={isInputEmpty || isTodoLimitReached}
                    >
                      {editIndex !== null ? (
                        <>
                          <span>
                            <img src={save} alt="save" />
                          </span>
                          <span>Save</span>
                        </>
                      ) : (
                        <>
                          <span>
                            <img src={add} alt="addIcon" />
                          </span>
                          <span>Add</span>
                        </>
                      )}
                    </button>
                    <button
                      className="add-delete-Response-btn"
                      onClick={handleCancel}
                    >
                      {" "}
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="input-btns">
                  <p className="todo">{todo} </p>

                  <div className="edit-add-btn">
                    <span className="characters">
                      {todo.trim().length}/{maxCharater}
                    </span>
                    <button
                      className="edit-Response-btn"
                      onClick={() => handleEdit(index)}
                    >
                      <span>
                        <img src={edit} alt="editIcon" />
                      </span>
                      Edit
                    </button>
                    <button
                      className="add-delete-Response-btn"
                      onClick={() => handleDelete(index)}
                    >
                      <span>
                        <img src={trash} alt="trashIcon" />
                      </span>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="response-input">
          {showInput && (
            <div className="input-btns">
              <input
                type="text"
                value={newTodo}
                onChange={handleInputChange}
                placeholder="Enter a new task"
                maxLength={maxCharater}
              />

              <div className="edit-add-btn">
                <button
                  className={
                    isInputEmpty
                      ? "edit-Response-btn grey"
                      : "edit-Response-btn"
                  }
                  onClick={handleAddTodo}
                  disabled={isInputEmpty || isTodoLimitReached}
                >
                  {editIndex !== null ? (
                    <span>
                      <img src={edit} alt="edit" /> Edit
                    </span>
                  ) : (
                    <span>
                      <img src={add} alt="addIcon2" /> Add
                    </span>
                  )}
                </button>
                <button
                  className="add-delete-Response-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          className={
            todos.length >= 10
              ? "add-delete-Response-btn-disable"
              : "add-delete-Response-btn"
          }
          onClick={() => setShowInput(true)}
          disabled={isTodoLimitReached || todos.length >= 10}
        >
          <span>
            <img src={add} alt="addIcon" />
          </span>
          Add a new quick response
        </button>
      </div>
    </div>
  );
};

export default Response;
