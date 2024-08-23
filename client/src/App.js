import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import UserNotes from "./pages/UserNotes";
import CreateNote from "./pages/CreateNote";
import NoteDetails from "./pages/NoteDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/my-notes" element={<UserNotes />} />
        <Route path="/note-details/:id" element={<NoteDetails />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
