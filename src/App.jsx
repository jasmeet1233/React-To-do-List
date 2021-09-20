import React, { useEffect, useState, useRef } from "react";
import Alert from "./Alert";
import List from "./List";
import { FiCheck } from "react-icons/fi";
import { gStar } from "./scratch";
import './styles.css'

const getLocalStorage = () => {
  const list = localStorage.getItem("todoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const localDataRef = useRef([]);
  const [todoList, setTodoList] = useState(getLocalStorage());
  const [inputText, setInputText] = useState("add item");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState("");
  const [showImportant, setShowImportant] = useState(false);

  const saveData = (list) => {
    localDataRef.current = list;
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (!inputText) {
      alertMessage(true, "no input");
    } else if (editing) {
      const updatedList = todoList.map((itemObj) => {
        if (itemObj.id === editID) return { ...itemObj, item: inputText };
        else return itemObj;
      });
      setTodoList(updatedList);
      saveData(updatedList); //
      alertMessage(true, "item updated");
      setInputText("");
      setEditing(false);
    } else {
      const newListItemObj = {
        item: inputText,
        id: new Date().getTime().toString(),
        importance: false,
      };
      setTodoList(todoList.concat(newListItemObj));
      saveData(localDataRef.current.concat(newListItemObj)); //
      setInputText("");
      alertMessage(true, "item added");
    }
  };

  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  };

  const deleteHandler = (id) => {
    const editedList = todoList.filter((item) => item.id !== id);
    setTodoList(editedList);
    saveData(editedList); //
    alertMessage(true, "Item Deleted");
  };

  const resetHandler = () => {
    setTodoList([]);
    saveData([]);
    alertMessage(true, "list Reseted");
  };

  const editHandler = (id) => {
    setEditing(true);
    const EditObj = todoList.find((obj) => obj.id === id);
    setInputText(EditObj.item);
    setEditID(id);
  };

  const alertMessage = (show = false, message = "") => {
    setAlert({ show, message });
  };

  const toggleImportance = (id) => {
    const updatedList = todoList.map((listObj) => {
      if (listObj.id === id) {
        return { ...listObj, importance: !listObj.importance };
      } else {
        return listObj;
      }
    });
    setTodoList(updatedList);
    saveData(updatedList);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [localDataRef.current]);

  useEffect(() => {
    if (showImportant) {
      const updatedList = todoList.filter((todoObj) => {
        return todoObj.importance === true;
      });
      setTodoList(updatedList);
    } else {
      setTodoList(getLocalStorage());
    }
  }, [showImportant]);

  return (
    <div className = 'main-container'>
      <div className="container">
        <form onSubmit={addHandler} className="form-container">
          <input
            value={inputText}
            onChange={inputChangeHandler}
            placeholder="add item"
          />
          <button type="submit">
            {editing ? <FiCheck style={{ color: "white" }} size="22" /> : "Add"}
          </button>
        </form>
        <div className="alert-container">
          {alert.show && <Alert alert={alert} alertMessage={alertMessage} />}
        </div>
        <div className="toggle-importance">
          <button onClick={() => setShowImportant(!showImportant)}>
            {showImportant ? "Show all" : "Starred"}
          </button>
        </div>
        <List
          todoList={todoList}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          toggleImportance={toggleImportance}
        />
        <div className="reset">
          <button onClick={resetHandler}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
