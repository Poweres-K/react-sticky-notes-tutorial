export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newNoted = [...state.notes, action.payload];
    return {
      ...state,
      notes: newNoted,
      isError: false,
      lastCreatetime: action.payload.id,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const newNotes = state.notes.filter((note) => note.id !== action.payload);
    return { ...state, notes: newNotes, isError: false };
  }
  if (action.type === "NO_VALUE") {
    return { ...state, isError: true };
  }
};
