import React from "react";
import { FiStar } from "react-icons/fi";
import { FcEmptyTrash } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { gStar } from "./scratch";
import UseAnimations from "react-useanimations";
import star from "react-useanimations/lib/star";

const List = ({ todoList, deleteHandler, editHandler, toggleImportance }) => {
  return (
    <ul className="list-container">
      {todoList.map((todoObj) => {
        const { id, item, importance } = todoObj;
        return (
          <li key={id}>
            <div className="list-item">{item}</div>
            <div className="list-buttons">
              <div>
                <button onClick={() => toggleImportance(id)}>
                  <FiStar
                    style={importance ? { color: "yellow" } : { color: "grey" }}
                    size={19}
                  />
                </button>
              </div>
              <div>
                <button onClick={() => deleteHandler(id)}>
                  <FcEmptyTrash size={19} style={{ marginRight: "7px" }} />
                </button>
                <button onClick={() => editHandler(id)}>
                  <AiFillEdit size={19} />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
