import React from "react";
import "./App.css";
import { FiStar } from "react-icons/fi";
import { FcEmptyTrash } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";

const List = ({ todoList, deleteHandler, editHandler, toggleImportance }) => {
  return (
    <ul className="list-container">
      {todoList.map((todoObj) => {
        const { id, item, importance } = todoObj;
        return (
          <li key={id}>
            <div className="list-item">{item}</div>
            <button onClick={() => toggleImportance(id)} className="importance">
              <FiStar />
            </button>
            <div className="list-buttons">
              <button onClick={() => deleteHandler(id)}>
                <FcEmptyTrash />
              </button>
              <button onClick={() => editHandler(id)}>
                <AiFillEdit />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
