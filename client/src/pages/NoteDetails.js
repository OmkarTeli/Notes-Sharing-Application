import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const NoteDetails = () => {
  const [note, setNote] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  //update note
  const [inputs, setInputs] = useState({});

  //get note details
  const getNoteDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/note/get-note/${id}`);
      if (data?.success) {
        setNote(data?.note);
        setInputs({
          title: data?.note.title,
          description: data?.note.description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoteDetail();
  }, [id]);

  //input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // form handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/note/update-note/${id}`, {
        title: inputs.title,
        description: inputs.description,
        user: id,
      });
      if (data?.success) {
        toast.success("Note Updated...");
        navigate("/my-notes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop={"30px"}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Edit Note
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24", fontWeight: "bold" }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />

          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </>
  );
};

export default NoteDetails;
