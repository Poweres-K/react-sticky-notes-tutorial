import React, { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import "./App.scss";

const Draggable = ({ note, dispatch, z }) => {
  const diffDetail = useRef({ diffX: "", diffY: "" });

  const startDrag = (e) => {
    diffDetail.current.diffX =
      e.screenX - e.target.getBoundingClientRect().left;
    diffDetail.current.diffY = e.screenY - e.target.getBoundingClientRect().top;
    e.target.classList.add("hide");
    console.log(e.target.classList);
    z += 1;
    e.target.style.zIndex = z;
  };

  const endDrag = (e) => {
    const left = e.screenX - diffDetail.current.diffX;
    const top = e.screenY - diffDetail.current.diffY;
    e.target.style.left = left + "px";
    e.target.style.top = top + "px";
    e.target.classList.remove("hide");
  };
  return (
    <div
      key={note.id}
      className="item-card"
      draggable="true"
      style={{ transform: `rotate(${note.rotate}deg)` }}
      onDragStart={startDrag}
      onDragEnd={endDrag}
    >
      <div className="relative-div">
        <p className="text">{note.text}</p>
        <button
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: note.id })}
        >
          <FaRegTrashAlt className="trash" />
        </button>
      </div>
    </div>
  );
};

export default Draggable;
