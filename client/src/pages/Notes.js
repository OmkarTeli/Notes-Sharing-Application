import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  //get notes
  const getAllNotes = async () => {
    try {
      const { data } = await axios.get("/api/v1/note/all-note");
      if (data?.success) {
        setNotes(data?.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <div>
      {notes &&
        notes.map((note) => (
          <NoteCard
            id={note?._id}
            isUser={localStorage.getItem("userId") === note?.user?._id}
            title={note?.title}
            description={note?.description}
            username={note?.user?.username}
          />
        ))}
    </div>
  );
};

export default Notes;
