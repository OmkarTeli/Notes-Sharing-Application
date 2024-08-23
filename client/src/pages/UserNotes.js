import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const UserNotes = () => {
  const [notes, setNotes] = useState([]);

  //get user notes
  const getUserNotes = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/note/user-note/${id}`);
      if (data?.success) {
        setNotes(data?.userNote.notes);
      }
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserNotes();
  }, []);
  return (
    <div>
      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard
            id={note._id}
            isUser={true}
            title={note.title}
            description={note.description}
            // username={note?.user?.username}
            time={note.createdAt}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center", margin: 80 }}>
          You Haven't Posted a note !!!!!!!!!
        </h1>
      )}
    </div>
  );
};

export default UserNotes;
