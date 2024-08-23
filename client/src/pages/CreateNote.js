import React, { useState } from "react";
import {} from "@mui/icons-material";
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateNote = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });
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
      const { data } = await axios.post("/api/v1/note/create-note", {
        title: inputs.title,
        description: inputs.description,
        user: id,
      });
      if (data?.success) {
        toast.success("Note Posted...");
        navigate("/my-notes");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            Create Note
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
          {/* <InputLabel
                    sx={{mb:1,mt:2,fontSize:'24',fontWeight:"bold"}}
                >
                    Image URL
                </InputLabel>
                <TextField 
                    name="image" 
                    value={inputs.image} 
                    onChange={handleChange} 
                    margin='normal' 
                    variant="outlined"
                    required
                /> */}
          <Button type="submit" color="primary" variant="contained">
            POST
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateNote;
