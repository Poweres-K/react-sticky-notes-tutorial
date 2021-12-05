import React, { useReducer, useRef, useState } from "react";
import { reducer } from "./reducer";
import Draggable from "./Draggable";

let z = 0;
export function App() {
  const defaultNote = {
    notes: [],
    lastCreatetime: "",
    isError: false,
  };
  const [state, dispatch] = useReducer(reducer, defaultNote);
  const textValue = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textValue.current.value;

    if (text) {
      var today = new Date();
      var time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        ":" +
        today.getMilliseconds();
      const newNote = {
        id: time,
        text,
        rotate: Math.floor(Math.random() * 20),
      };
      dispatch({ type: "ADD_ITEM", payload: newNote });
      textValue.current.value = "";
      return;
    }
    dispatch({ type: "NO_VALUE" });
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app" onDragOver={dragOver}>
      <h1>Sticky Notes ({state.notes.length})</h1>
      {state.lastCreatetime && (
        <div className="timestamp">
          <p>Last note created: {state.lastCreatetime}</p>
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e)} className="note-form">
        <textarea
          className={state.isError ? "Error" : undefined}
          placeholder={
            state.isError
              ? "Please enter at least one character"
              : "create a new note"
          }
          ref={textValue}
        ></textarea>
        <button>Add</button>
      </form>
      {state.notes.map((note) => {
        return (
          <Draggable note={note} key={note.id} dispatch={dispatch} z={z} />
        );
      })}
    </div>
  );
}
